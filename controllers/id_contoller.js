const Url = require("../models/url");
const client = require("../config/redis");
module.exports.id = async function (req, res) {
  try {
    const urlExist = await Url.findOne({ url_code: req.params.id });
    const urlCache = await client.get(req.params.id);
    if (urlCache !== null) {
      res.redirect(urlCache);
    }
    if (urlExist === null) {
      return res.status(404).json({
        message: "The requested url has been expired or does not exist",
      });
    }
    client.setEx(req.params.id, 3600, urlExist.original_url);
    res.redirect(urlExist.original_url);
    return;
  } catch (err) {
    return res.status(404);
  }
};
