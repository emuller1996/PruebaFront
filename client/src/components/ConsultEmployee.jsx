import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


export default function ConsultEmployee() {



    const [employees, setEmployees] = useState([]);
    const [nameEmployee, setNameEmployee] = useState();


    const getEmployeesByNanme = async (e) => {
        e.preventDefault();



        try {
            setEmployees(undefined);
            const result = await axios.get(`http://localhost:3001/employee/search/${nameEmployee}`);
            setEmployees(result.data.employees)

        } catch (error) {
            toast.error(error.response.data.error, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true
            })
            setEmployees([]);


        }

    }


    const changeEmployeesState = async(employee) => {
        console.log(employee)

        const result = await axios.patch('http://localhost:3001/employee/changeState', employee)
        console.log(result)

        setEmployees(undefined);
        const result2 = await axios.get(`http://localhost:3001/employee/search/${nameEmployee}`);
        setEmployees(result2.data.employees)

    }


    return (


        <div className="container ">
            <h1 className="text-center">Consultar empleado </h1>

            <div className="bg-orange mt-4 p-2 rounded shadow">
                <form onSubmit={getEmployeesByNanme}>
                    <div className="row g-3 align-items-center">
                        <div className="col-3">
                            <label htmlFor="nameEmployee" className="text-center w-100">Nombre Empleado</label>
                        </div>
                        <div className="col-6">
                            <input class="form-control me-2" value={nameEmployee} type="search" onChange={(e) => setNameEmployee(e.target.value)} name='nameEmployee' placeholder="Search" aria-label="Search" />

                        </div>
                        <div className="col-3">
                            <button class="btn btn-outline-light" type="submit">Search</button>

                        </div>
                    </div>
                </form>


            </div>


            <div className="row g-3 mt-2">


                {

                    employees ? employees.map(employee =>
                    (
                        <div className="col-md-6">
                            <div className={employee.state ? 'card border bg-employees-true' : 'card border bg-employees-false'}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-8">
                                            <h4 className='text-center fw-bold m-0'>{employee.name}</h4>
                                            <p className='text-center fw-semibold m-0'>Fecha Ingreso {employee.registrationDate}</p>
                                        </div>
                                        <div className="col-4">
                                            <button className="btn btn-outline-secondary" onClick={() => { changeEmployeesState(employee) }}>Cambiar de Estado</button>

                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    ))
                        : (<div className="col-12"><div class="spinner-border text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div></div>)}


            </div>
        </div>
    )
}