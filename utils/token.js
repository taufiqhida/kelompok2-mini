const crypto = require('crypto');

const generateResetToken = () => {
  const token = crypto.randomBytes(20).toString('hex');
  return token;
};

const generateVerificationToken = () => {
  const token = crypto.randomBytes(20).toString('hex');
  return token;
};

module.exports = {
  generateResetToken,
  generateVerificationToken,
};