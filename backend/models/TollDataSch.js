// const mongoose = require('mongoose');

// const firstSchema = new mongoose.Schema({
//     date : String,
//     vehicleNumber: String,
//     userMobileNumber: String,
//     userTyre64: String,
//     tyreStatus : Object,
// }); 

// const TollData = mongoose.model('first', firstSchema);

// module.exports = TollData;

// const mongoose = require('mongoose');

// const firstSchema = new mongoose.Schema({
//     vehicleNumber: String,
//     userMobileNumber: String,
//     userTyre64: String,
//     tyreStatus: Object,
// },
//     {
//         timestamps: {
//             createdAt: { type: Date, default: Date.now },
//             updatedAt: { type: Date, default: Date.now },
//             get: (timestamp) => {
//                 // Customize the date format as needed
//                 return new Date(timestamp).toLocaleDateString();
//             }
//         }
//     });

// const TollData = mongoose.model('first', firstSchema);

// module.exports = TollData;
const mongoose = require('mongoose');

const firstSchema = new mongoose.Schema({
    date: {
        type: String,
        default: () => new Date().toISOString().split('T')[0]
    },

    vehicleNumber: String,
    userMobileNumber: String,
    userTyre64: Object,
    tyreStatus: Object,
    tollPlaza : String
});

const TollData = mongoose.model('first', firstSchema);

module.exports = TollData;