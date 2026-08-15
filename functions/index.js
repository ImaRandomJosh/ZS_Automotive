const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");
const {defineSecret} = require("firebase-functions/params");
const {Resend} = require("resend");

initializeApp();

const db = getFirestore();
const resendApiKey = defineSecret("RESEND_API_KEY");

exports.submitQuote = onRequest(
    {
      region: "northamerica-northeast2",
      secrets: [resendApiKey],
    },
    async (req, res) => {
      if (req.method !== "POST") {
        res.status(405).json({
          success: false,
          error: "Method not allowed",
        });
        return;
      }

      try {
        const payload = req.body || {};
        const customer = payload.customer || {};

        const quoteItems = Array.isArray(payload.quoteItems) ?
          payload.quoteItems :
          [];

        if (
          !customer.firstName ||
          !customer.lastName ||
          !customer.phone ||
          !customer.email
        ) {
          res.status(400).json({
            success: false,
            error: "Missing required customer information",
          });
          return;
        }

        const quoteRef = db.collection("quotes").doc();

        const quoteNumber =
          `ZS-${quoteRef.id.slice(0, 8).toUpperCase()}`;

        const quote = {
          quoteNumber,
          status: "new",

          customer: {
            firstName: String(customer.firstName).trim(),
            lastName: String(customer.lastName).trim(),
            phone: String(customer.phone).trim(),
            email: String(customer.email).trim(),
            plateNumber: String(customer.plateNumber || "").trim(),
            preferredDate: String(customer.preferredDate || "").trim(),
            serviceNeeded: String(customer.serviceNeeded || "").trim(),
            notes: String(customer.notes || "").trim(),
          },

          quoteItems,

          estimatedTotalCAD:
            Number(payload.estimatedTotalCAD) || 0,

          createdAt: FieldValue.serverTimestamp(),
        };

        // Save quote to Firestore first.
        await quoteRef.set(quote);

        // Initialize Resend using the Firebase secret.
        const resend = new Resend(resendApiKey.value());

        const emailSubject =
          `ZS Automotive Quote Request - ${quoteNumber}`;

        // ---------------------------------------------------------
        // EMAIL #1: Notification to ZS Automotive
        // Replying to this email goes directly to the customer.
        // ---------------------------------------------------------

        const {error: teamEmailError} = await resend.emails.send({
          from: "ZS Automotive <quotes@testzsauto.ca>",
          to: "thesimplisticjosh@gmail.com",
          replyTo: quote.customer.email,
          subject: emailSubject,
          text: `
New ZS Automotive Quote Request

Quote Number:
${quoteNumber}

Customer:
${quote.customer.firstName} ${quote.customer.lastName}

Email:
${quote.customer.email}

Phone:
${quote.customer.phone}

Service:
${quote.customer.serviceNeeded || "Not specified"}

Preferred Date:
${quote.customer.preferredDate || "Not specified"}

Plate Number:
${quote.customer.plateNumber || "Not provided"}

Notes:
${quote.customer.notes || "None"}

Estimated Total:
$${quote.estimatedTotalCAD.toFixed(2)} CAD
          `,
        });

        if (teamEmailError) {
          console.error("Team email failed:", teamEmailError);
        }

        // ---------------------------------------------------------
        // EMAIL #2: Confirmation to the customer
        // Replying to this email goes to ZS Automotive.
        // ---------------------------------------------------------

        const {error: customerEmailError} =
          await resend.emails.send({
            from: "ZS Automotive <quotes@testzsauto.ca>",
            to: quote.customer.email,
            replyTo: "thesimplisticjosh@gmail.com",
            subject: emailSubject,
            text: `
Hi ${quote.customer.firstName},

Thanks for contacting ZS Automotive.

We've received your quote request and will get back to you shortly.

Quote Number:
${quoteNumber}

Service:
${quote.customer.serviceNeeded || "Not specified"}

Preferred Date:
${quote.customer.preferredDate || "Not specified"}

Estimated Total:
$${quote.estimatedTotalCAD.toFixed(2)} CAD

If you have any questions or additional information,
just reply directly to this email.

ZS Automotive
437-603-8022
            `,
          });

        if (customerEmailError) {
          console.error(
              "Customer email failed:",
              customerEmailError,
          );
        }

        // The quote was successfully saved even if an email failed.
        res.status(201).json({
          success: true,
          quoteId: quoteRef.id,
          quoteNumber,
        });
      } catch (error) {
        console.error("Quote submission failed:", error);

        res.status(500).json({
          success: false,
          error: "Unable to submit quote",
        });
      }
    },
);
