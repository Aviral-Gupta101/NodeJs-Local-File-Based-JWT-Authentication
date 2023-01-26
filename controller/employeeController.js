const data = {};
data.emp = require("../data/employee.json");

const getAllEmployee = (req, res) => {
    res.json(data.emp);
}

const addEmployee = (req, res) => {
    res.json({
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname
    })
}

const updateEmployee = (req, res) => {
    res.json({
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname
    })
}
const deleteEmployee = (req, res) => {
    res.json({
        "id":req.body.id,
        "firstname" : data.emp[req.body.id].name
    });
}

const getEmployee = (req, res) => {
    res.json({
        "id" : req.params.id,
        "firstname" : data.emp[req.params.id]

    });
};

module.exports = {getAllEmployee, addEmployee, updateEmployee, deleteEmployee, getEmployee};