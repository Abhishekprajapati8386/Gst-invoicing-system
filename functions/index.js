const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { calculateGST } = require("./gstCalculator");
const { fileGST } = require("./gstAPI");

admin.initializeApp();
const db = admin.firestore();

exports.processGSTInvoice = functions.firestore
  .document("bookings/{bookingId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // trigger when status become finished
    if (before.status !== "finished" && after.status === "finished") {
      console.log("Processing GST Invoice for:", after.name);

      // Gst calculation
      const gstDetails = calculateGST(after.totalAmount);

      // gst api call
      const response = await fileGST(after, gstDetails);

      if (response.success) {
        // updating gst firestore document
        await db.collection("bookings").doc(context.params.bookingId).update({
          gstFiled: true,
          gstResponse: response.data,
        });
      } else {
        console.error("GST Filing Failed:", response.error);
      }
    }
  });
