const mongoose = require('mongoose');

const EmpSchema = mongoose.Schema(
    {
    empid: Number,
    empname: String,
    dob: Date,
    mobile: String,
    email: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('employees', EmpSchema);
