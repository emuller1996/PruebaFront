import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function DetailEmployee() {

    const { id } = useParams();
    const  history = useHistory();
    const [employee, setEmployee] = useState({});


    useEffect(() => {

        getEmployees()


    }, [])


    const getEmployees = async () => {

        try {
            const result = await axios.get(`http://localhost:3001/employee/${id}`);
            console.log(result.data);
            setEmployee(result.data.employee);
            
        } catch (error) {

        }

    }

    const handleChangeEmployee = (e) => {
        if(e.target.name === 'state') setEmployee({ ...employee, state: !employee.state })
        setEmployee({
            ...employee, [e.target.name]: e.target.value
        })
    }


    const editEmployee = async(e)=>{

        e.preventDefault();
        console.log(employee)

        try {
            const result = await axios.put('http://localhost:3001/employee',employee);
        
            console.log(result)
            toast.success(result.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true
            })
            history.goBack();

        } catch (error) {

            toast.error(`Error : ${error.response.data.error}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true
            });
            
        }

    }



    return (

        <div className="container mt-4">
            <div className="card border">
                <div class="card-header">
                    Detalle de Empleado : {employee ? `${employee.name}  ${employee.lastName}` : ' ...'}
                </div>
                <div className="card-body">
                    <form action="" onSubmit={editEmployee}>
                        <div className="row">
                            <div className="col-4">
                                <input
                                    class="form-control"
                                    type="text"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChangeEmployee} />

                            </div>

                            <div className="col-4">
                                <input
                                    class="form-control"
                                    type="text"
                                    name="lastName"
                                    value={employee.lastName}
                                    onChange={handleChangeEmployee} />
                            </div>

                            <div className="col-2">
                                <input
                                    class="form-control"
                                    type="date"
                                    name="registrationDate"
                                    value={employee.registrationDate}
                                    disabled />
                            </div>
                            <div className="col-2">
                                <div class="form-check">
                                    <input class="form-check-input" 
                                    type="checkbox" 
                                    name="state" value={!employee.state} 
                                    id="flexCheckChecked" checked={employee.state}
                                    onChange={handleChangeEmployee} />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            Estado
                                        </label>
                                </div>

                            </div>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-success mt-3">Guardar</button>
                            </div>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    )
}