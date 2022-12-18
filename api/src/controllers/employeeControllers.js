const Employee = require("../models/employee");
const mongoose = require("mongoose");

const allEmployee = function (req, res) {
  Employee.find()
    .sort({name:1})
    .then((data) => {
      res.status(200).json({
        employees: data,
      });
    })
    .catch((err) => {
      res.status(404).json({ error: err.message });
    });
};

const createEmployee = async function (req, res) {
  const employee = req.body;
  console.log(employee)
  if (!employee.name) return res.status(422).json({ error: 'Nombre del empleado es requerido' })
  if (!employee.lastName) return res.status(422).json({ error: 'Apellido del empleado es requerido' })
  if (!employee.registrationDate) return res.status(422).json({ error: 'Fecha de registro del empleado es requerido' })

  Object.assign(employee, { _id: new mongoose.Types.ObjectId() })


  try {
    const EmployeeCreated = new Employee(employee);
    const result = await EmployeeCreated.save();
    return res.status(201).json({
      message: 'Empreado creado correctamente',
      employeeCreated: result
    })

  } catch (error) {
    return res.status(422).json({ error: 'No se pudo eegistar el Empleado' })
  }



}

const searchEmployeeByName = async function (req, res) {


  const name = req.params.name;
  console.log(name)

  try {
    const result = await Employee.find({ name: { $regex: name, $options: 'i' } })
    console.log(result)
    if (result.length === 0) return res.status(404).json({ error: `Empleado con el nombre '${name}' no fue encontrado` })
    res.status(200).json({ employees: result })
  } catch (error) {
    res.status(422).json({ error: error.message })

  }
}

const getEmployeById =  async(req,res)=>{
  const id = req.params.id;
  const result = await Employee.findOne({_id :id});
  res.status(200).json({employee: result})
}

const changeEmployeeState = async (req, res) => {

  const id = req.body._id;
  const state = !req.body.state;

  console.log(id)
  console.log(state)


  /* try {
    const result = await Employee.findByIdAndUpdate(
      { _id: employee._id },
      { $set: { state: state } }, { new: true })

    return res.json({ result })

  } catch (error) {
    return res.json({ error: error.message })


  } */


  try {
    const result = await Employee.findByIdAndUpdate(
      { _id: id },
      { $set: { state : state } },
      { new: true }
    );
    console.log(result)

    return res.status(202).json({ message: "Employee status has changed" });
  } catch (error) {
    return res.status(404).json({ error: error.message.toString });
  }
}

const updateEmployee = async(req, res) => {
  const employee = req.body;
  console.log(employee)

  try {
    const result = await Employee.findByIdAndUpdate(
        { _id: employee._id },
        { $set: employee },
        { new: true }
      );

    console.log(result);
    return res.status(202).json({message : `Employee has been successfully updated`, employee : result})
} catch (error) {
  return res.status(422).json({error : error.message})
}

  
  return res.status(200).json({ message: 'PUT updateEmployee()'})
}


module.exports = {
  allEmployee,
  createEmployee,
  searchEmployeeByName,
  changeEmployeeState,
  getEmployeById,
  updateEmployee
};
