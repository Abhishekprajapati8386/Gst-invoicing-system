function calculateGST(amount) {
    const GST_RATE = 18;
    const gstAmount = (amount * GST_RATE) / 100;

    return {
        totalGST: gstAmount,
        IGST: gstAmount / 2,
        SGST: gstAmount / 2,
        CGST: gstAmount / 2
    };
}

module.exports = { calculateGST };
