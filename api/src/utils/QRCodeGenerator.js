const QRCode = require("qrcode");

const QRCodeGenerator = async (data) => {
  try {
    return await QRCode.toDataURL(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { QRCodeGenerator };
