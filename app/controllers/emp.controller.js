//Module variable... m_Emp
const m_Emp = require('../models/emp.model.js');

// Create and Save a new employee
exports.create = (req, res) => {
    // Create an employee
    const _emp = new m_Emp({
        empid: req.body.empid,
        empname: req.body.empname,
        dob: req.body.dob,
        mobile: req.body.mobile,
        email: req.body.email
    });

    // Save employee in the database
    _emp.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating Employee."
            });
        });

};

// Retrieve and return all employees from the database.
exports.findAll = (req, res) => {
    m_Emp.find()
    .then(emp => {
        res.send(emp);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving employees."
        });
    });
    
};

// Find a single employee with an EmpId
exports.findOne = (req, res) => {
    m_Emp.findById(req.params.uid)
        .then(emp => {
            if (!emp) {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.uid
                });
            }
            res.send(emp);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.uid
                });
            }
            return res.status(500).send({
                message: "Error retrieving employee with id " + req.params.uid
            });
        });
};

// Update an employee identified by the EmpId in the request
exports.update = (req, res) => {
 // Find employee and update it with the request body
 m_Emp.findByIdAndUpdate(req.params.uid, {
    empid: req.body.empid,
    empname: req.body.empname,
    dob: req.body.dob,
    mobile: req.body.mobile,
    email: req.body.email
}, {
    new: true
})
.then(emp => {
    if (!emp) {
        return res.status(404).send({
            message: "Employee not found with id " + req.params.uid
        });
    }
    res.send(emp);
}).catch(err => {
    if (err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Employee not found with id " + req.params.uid
        });
    }
    return res.status(500).send({
        message: "Error updating employee with id " + req.params.uid
    });
});
};

// Delete an employee with the specified EmpId in the request
exports.delete = (req, res) => {
    m_Emp.findByIdAndRemove(req.params.uid)
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.uid
            });
        }
        res.send({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.uid
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee with id " + req.params.uid
        });
    });
};