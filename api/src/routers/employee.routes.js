const { Router } = require('express');
const { allEmployee, 
    createEmployee,
    searchEmployeeByName,
    changeEmployeeState,
    getEmployeById,
    updateEmployee
} = require('../controllers/employeeControllers');
const employeeRouter = Router();


employeeRouter.get('/', allEmployee);
employeeRouter.get('/search/:name', searchEmployeeByName);
employeeRouter.get('/:id', getEmployeById);
employeeRouter.post('/', createEmployee);
employeeRouter.put('/', updateEmployee);
employeeRouter.patch('/changeState', changeEmployeeState);







module.exports = employeeRouter;