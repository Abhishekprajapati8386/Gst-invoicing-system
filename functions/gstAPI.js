require("dotenv").config();
const axios = require("axios");

const GST_API_URL = process.env.GST_API_URL;
const GST_API_KEY = process.env.GST_API_KEY;

async function fileGST(booking, gstDetails) {
    try {
        const response = await axios.post(GST_API_URL, {
            name: booking.name,
            amount: booking.totalAmount,
            GST: gstDetails.totalGST,
            IGST: gstDetails.IGST,
            SGST: gstDetails.SGST,
            CGST: gstDetails.CGST
        }, {
            headers: { Authorization: `Bearer ${GST_API_KEY}` }
        });

        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = { fileGST };
