const mongoose = require ("mongoose");

const hostSchema = {
    hostname: {type: String,
             required: true
            },
     email: {type: String,
             required: true
            },
    password: {
        type: String,
        required:true
    },

    date_created: {
        type: Date,
        default: Date.now
    }

}
const Host = new mongoose.model("host", hostSchema);
module.exports = Host;