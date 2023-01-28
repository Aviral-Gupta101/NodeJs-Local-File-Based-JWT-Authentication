const express = require("express");
const { addEmployee, getEmployee, updateEmployee, deleteEmployee, getAllEmployee } = require("../../controller/employeeController");
const router = express.Router();

router.route('/')
    .get(getAllEmployee)
    .post(addEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee);

router.route("/:id")
    .get(getEmployee);

module.exports = router;