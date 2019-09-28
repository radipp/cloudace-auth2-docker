//Function to create ID, i used MD5, it can be changed to a proper ID management that check the database ID list
const createID = function (text) {

    var crypto = require('crypto');
    var hashObj = crypto.createHash('MD5');
    hashData = hashObj.update(text, 'utf-8');
    hashGenerated = hashData.digest('hex');
    return hashGenerated;

};

module.exports = createID;