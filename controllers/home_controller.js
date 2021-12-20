const url_checker = require("url").URL;
const shortid = require("shortid");
const Url = require("../models/url");
const redis = require("redis");
const client = require("../config/redis");
const DEFAULT_EXP = 3600;

const isValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports.home = async function (req, res) {
  try {
    let url = req.body.url;

    if (isValidUrl(url)) {
      const redis_data = await client.get(url);
      if (redis_data !== null) {
        return res.status(200).json({
          original_url: url,
          generated_url: redis_data,
        });
      }
      let isUrlExist = await Url.findOne({ original_url: url });
      if (isUrlExist === null) {
        let url_code = shortid.generate();
        let generated_url = "https://tin-y.herokuapp.com/" + url_code;
        let urlCrete = await Url.create({
          url_code: url_code,
          original_url: url,
          generated_url: generated_url,
        });
        client.setEx(url, DEFAULT_EXP, generated_url);
        res.status(201).json({
          original_url: url,
          generated_url: generated_url,
        });
      } else {
        res.status(403).json({
          original_url: isUrlExist.original_url,
          generated_url: isUrlExist.generated_url,
        });
        return;
      }
    } else {
      res.status(422).json({
        message: "Given Url is not Valid",
      });
    }
  } catch (err) {
    return res.status(500);
  }
};
