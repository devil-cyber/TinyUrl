const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    url_code: {
      type: String,
      required: true,
    },

    original_url: {
      type: String,
      required: true,
    },
    generated_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
