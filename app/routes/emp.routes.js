module.exports = (app) => {
    const _emps = require('../controllers/emp.controller.js');

    // Create a new employee
    //localhost:3000/employees
    app.post('/employees', _emps.create);

    // Retrieve all employees
    //localhost:3000/employees
    app.get('/employees', _emps.findAll);

    // Retrieve a single employee with EmpId
    //localhost:3000/employees/5dd1719d3876eb1d7c07db8d
    app.get('/employees/:uid', _emps.findOne);

    // Update an employee with EmpId
    //localhost:3000/employees/5dd1719d3876eb1d7c07db8d
    app.put('/employees/:uid', _emps.update);

    // Delete an employee with EmpId
    //localhost:3000/employees/5dd1719d3876eb1d7c07db8d
    app.delete('/employees/:uid', _emps.delete);
}