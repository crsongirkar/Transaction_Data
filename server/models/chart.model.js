const mongoose = require('mongoose');

const barChartSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    range: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const barChartModel = mongoose.model('barChart', barChartSchema);
module.exports = { barChartModel };
