
var getSecret = async function () {
  return process.env.JWT_KEY
};

module.exports = getSecret;