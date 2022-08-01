import { useState } from "react";
import ReactDOM from "react-dom";
import { Navbar } from "../index";

import axios from "axios";

import "./Register.scss";
function Register() {
    let [forminfo, setForminfo] = useState({
        user_name: "",
        user_lastname: "",
        user_email: "",
        user_password: "",
    });
    let [axioserror, setAxioserror] = useState({
        user_name: "",
        user_lastname: "",
        user_email: "",
        user_password: "",
    })

    function handlerChange(e){
        setForminfo({
            ...forminfo,
            [e.target.name]: e.target.value
        })
    }
    function handlerSubmit(e){
        e.preventDefault();
        axios.post("/registrar",forminfo)
        .then(res=>{
            console.log(res.data)
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("status",res.data.status)
            window.location.href="/crear/tarea"; 
        })
        .catch(err=>{
            let errors = err.response.data.errors;
            setAxioserror({
                user_name: errors.user_name,
                user_lastname: errors.user_lastname,
                user_email: errors.user_email,
                user_password: errors.user_password,
            })
        })
    }
    return (
        <>
            <Navbar />
            <section className="register">
                <div className="register__create">
                    <h1>Registro</h1>
                    <form className="register__form" method="POST" action="/api/registrar" onSubmit={handlerSubmit}>
                        <label>
                            Nombre:
                            <input type="text" name="user_name" value={forminfo.user_name} onChange={handlerChange}/>
                            <span className="input__error">{axioserror.user_name}</span>
                        </label>
                        <label>
                            Apellido:
                            <input type="text" name="user_lastname" value={forminfo.user_lastname} onChange={handlerChange}/>
                            <span className="input__error">{axioserror.user_lastname}</span>
                        </label>
                        <label>
                            Email:
                            <input type="email" name="user_email" value={forminfo.user_email} onChange={handlerChange}/>
                            <span className="input__error">{axioserror.user_email}</span>
                        </label>
                        <label>
                            Contraseña:
                            <input type="password" name="user_password" value={forminfo.user_password} onChange={handlerChange}/>
                            <span className="input__error">{axioserror.user_password}</span>
                        </label>
                        <div className="form__action">
                            <a href="/login" className="btn__out">
                                Iniciar sesión
                            </a>
                            <button type="submit" className="btn">
                                Registrarse
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
export default Register;

if (document.getElementById("register")) {
    ReactDOM.render(<Register />, document.getElementById("register"));
}
