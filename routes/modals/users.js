const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const encryptPsw = (psw, callback) => {
    return bcrypt.hash(psw, 13, function (err, hash) {
        if (err) throw err;
        callback(hash)
    });
}

const comparePws = (psw, hash) => {
    return bcrypt.compare(psw, hash, function (err, result) {
        if (err) return false;
        return true;
    });
}

const users = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    contact: Number,
    password: {
        type: String,
        required: true,
        select: false
    },
    token: {
        type: String,
        default: function () {
            return Math.random().toString(36).substr(2);
        }
    }
})

const userModal = mongoose.model('users', users);


module.exports.getAllUsers = (callback) => {
    return userModal.find((err, data) => {
        if (err || !data) {
            console.log(err);
            callback("Records not found", []);
        } else {
            callback(null, data);
        }
    })
}

module.exports.getUserByToken = (token, callback) => {
    return userModal.findOne({ token: token }, (err, data) => {
        if (err || !data) {
            console.log(err);
            callback("User not found", {});
        } else {
            callback(null, data);
        }
    })
}

module.exports.deleteUserByToken = (token, callback) => {
    return userModal.deleteOne({ token: token }, (err, data) => {
        if (err || !data) {
            console.log(err);
            callback("Failed to delete user", {});
        } else {
            callback(null, data);
        }
    })
}

module.exports.addUser = (user, callback) => {
    if (user.password) {
        encryptPsw(user.password, (data) => {
            user.password = data;
            return userModal.create(user, (err, data) => {
                if (err || !data) {
                    console.log(err);
                    callback("Failed to add user", {});
                } else {
                    callback(null, data);
                }
            })
        });
    }    
}

module.exports.updateUser = (user, callback) => {
    delete user.password;
    return userModal.findOne({ token: user.token }, (err, result) => {
        if (err || !result) {
            console.log(err);
            callback("User not found to update", {});
        } else {
            userModal.updateOne(result, user, (err, data) => {
                if (err || !data) {
                    console.log(err);
                    callback("Failed to update user", {});
                } else {
                    callback(null, user);
                }
            })
        }
    })
}