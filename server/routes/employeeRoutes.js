const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');



router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', employeeController.addEmployee);
router.get('/employees/count', employeeController.getEmployeeCount);


module.exports = router;
