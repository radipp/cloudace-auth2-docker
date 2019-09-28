//Check Request if its fullfil the format or not, the email and password must not be undefined or not empty

const checkRequest = function (email,password) {

    if(email === undefined) {return false};
    if(password === undefined) {return false};
    if (email.trim() == "") {return false};
    if (password.trim() == "") {return false};
    return true
};
    
module.exports = checkRequest;