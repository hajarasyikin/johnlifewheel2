const mongooose = require('mongoose')

const UserSchema = new mongooose.Schema({

    actions: {
        type: String,
    },
    areas: {
        type: String,
    },
    email: {
        type: String,
        required: true
    }
   

});

const User = mongooose.model('User', UserSchema);

module.exports = User;
