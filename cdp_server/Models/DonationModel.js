
const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
    donationName: {
    type: String,
    required: true,
  },
  donationDescription: {
    type: String,
    required: true,
  },
  donationPrice: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
//   sellerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'entrepreneur',
//     required: true,
//   },
}, {
  timestamps: true,
});

const donation = mongoose.model("donation", donationSchema);

module.exports = {donation};
 