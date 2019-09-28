//Function to hash the password

const createHash = function (text) {

    var crypto = require('crypto');
    var hashObj = crypto.createHash('sha512');
    hashData = hashObj.update(text, 'utf-8');
    hashGenerated = hashData.digest('hex');
    return hashGenerated;

};

module.exports = createHash;
