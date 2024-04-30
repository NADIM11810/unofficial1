// models/Roshid.js

import mongoose from 'mongoose';

const roshidSchema = new mongoose.Schema({
    bangladeshFormNo: String,
    attachment: String,
    serialNumber: String,
    paragraphNumber: String,
    landOfficeName: String,
    mouzaJLNo: String,
    upazilaThana: String,
    district: String,
    arrearLastThreeYears: String,
    arrearPastThreeYears: String,
    interestAndCompensation: String,
    currentClaim: String,
    totalClaim: String,
    totalCollection: String,
    totalArrear: String,
    totalInWords: String,
    noteBl: String,
    challanNo: String,
    dateBangla: String,
    dateEnglish: String,
    category: String,
    landEntries: [{ landCategory: String, landArea: String, plotNo: String }],
    ownerEntries: [{ ownerName: String, ownerShare: String }],
    khatianNo: String,
        holdingNumber: String
});

const Roshid = mongoose.model('Roshid', roshidSchema);

export default Roshid;
