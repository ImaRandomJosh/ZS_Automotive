const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();

exports.submitQuote = onRequest(
    {region: "northamerica-northeast2"},
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

        await quoteRef.set(quote);

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
