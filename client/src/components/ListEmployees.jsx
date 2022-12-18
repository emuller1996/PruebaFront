import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormEmployees from './FormEmployees';

export default function ListEmployees() {

    const [employees, setEmployees] = useState([]);


    useEffect(() => {
        getEmployees();


    }, [])

    const getEmployees = async () => {
        setEmployees(undefined);
        const result = await axios.get('http://localhost:3001/employee');
        setEmployees(result.data.employees)


    }
    return (
        <>

            <div className="container mt-5">
                <div className="bg-orange rounded shadow-sm mb-4 p-2">
                    <h3 className='text-center pt-2'> Lista de Empleados</h3>
                    <div className="row">
                        <div className="col-md-4">
                            <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#createEmployeeModal" >
                                <i class="fa-regular fa-square-plus me-1"></i> <span className="d-none d-sm-none d-md-inline">Nuevo Empleado</span>
                            </button>
                        </div>

                    </div>
                    <div class="modal fade" id="createEmployeeModal" tabindex="-1" aria-labelledby="createEmployeeModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content bg-modal">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="createEmployeeModalLabel">Crear Empleado</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <FormEmployees />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-3">

                    {
                        employees ? employees.map(employee =>
                        (
                            <div className="col-md-6 ">
                                <div class="card border card-employees">
                                    <div class="card-body ">
                                        <div className="row">
                                            <div className="col-8">
                                                {`${employee.name} ${employee.lastName}`}
                                            </div>
                                            <div className="col-4">
                                                <div class="btn-group w-100" role="group" aria-label="Basic example">
                                                    <span type="button" class={employee.state ? 'btn btn-success' : 'btn btn-danger'}  >  {employee.state ? 'Activo' : 'Inactivo'}</span>
                                                    <Link to={`/EditEmploye/${employee._id}`} type="button" class="btn btn-secondary text-white"><i class="fa-regular fa-pen-to-square"></i></Link>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                Fecha de registro {employee.registrationDate}
                                            </div>
                                            <div className="col-6">
                                                Numero Empleado
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))
                            : (<p>Cargando</p>)}




                </div>
            </div>
        </>
    )
} 