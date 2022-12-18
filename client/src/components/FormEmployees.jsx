import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function FormEmployees() {


    const [input, setInput] = useState({
        state: true
    })


    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const result = await axios.post('http://localhost:3001/employee', input);
            console.log(result.data)
            toast.success(result.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true
            })
            setInput({
                state : true
            })

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

        <form onSubmit={handleSubmit}>
            <div class="modal-body">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div class="form-floating mb-3">
                            <input type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder="n"
                                name='name'
                                value={input.name ? input.name : ''}
                                onChange={handleChangeInput} />
                            <label for="floatingInput">Nombre</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="form-floating mb-3">
                            <input type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder="n"
                                name='lastName'
                                value={input.lastName ? input.lastName : ''}
                                onChange={handleChangeInput} />
                            <label for="floatingInput">Apellido</label>
                        </div>
                    </div>
                    <div className="col-8">
                        <div class="form-floating mb-3">
                            <input type="date" class="form-control" id="floatingInput" placeholder="n"
                                name='registrationDate'
                                value={input.registrationDate ? input.registrationDate : ''}
                                onChange={handleChangeInput} />
                            <label for="floatingInput">Fecha de Ingreso</label>
                        </div>

                    </div>
                    <div className="col-md-4">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                                name="state"
                                checked={input.state}
                                onChange={handleChangeInput} />
                            <label class="form-check-label" for="flexSwitchCheckChecked">Estado</label>
                        </div>
                    </div>
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary">Guardar Empleado</button>
            </div>

        </form>
    )
}