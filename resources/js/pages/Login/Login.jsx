import React, {useRef,useState} from "react";
import ReactDOM from "react-dom";

import { Navbar } from "../index";
import axios from "axios";

import "./Login.scss";


export default function Login() {
    let [useremail, setUseremail] = useState("");
    let [userpassword, setUserpassword] = useState("");
    let [message,setMessage]= useState("");

    let email = useRef();
    let password = useRef();

    function handlerSubmitAndlogin(e){
        let user = {
            [email.current.name]: useremail,
            [password.current.name]: userpassword
        }
        e.preventDefault();
        axios.post("/login", user)
            .then(res => {
                console.log(res.data)
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("status", res.data.status);
                if(res.data.status === "loged"){
                    window.location.href = "/tareas";
                }
                setMessage("usuario o contraseña incorrectos")
            })
            .catch(err => {
                setMessage("todos los campos requeridos")
            }
        );
    }
    function handlerChangeEmail(){
        setUseremail(email.current.value);
    }
    function handlerChangePassword(){
        setUserpassword(password.current.value);
    }
    return (
        <>
            <Navbar />
            <section className="login">
                <div className="login__create">
                    <h1>Login</h1>
                    <form className="login__form" method="POST" action="/api/login" onSubmit={handlerSubmitAndlogin}>
                        <span className="input__error">{message}</span>
                        <label>
                            Email:
                            <input type="email" name="user_email" ref={email} value={useremail} onChange={handlerChangeEmail} />
                        </label>
                        <label>
                            Contraseña:
                            <input type="password" name="user_password" ref={password} value={userpassword} onChange={handlerChangePassword}/>
                        </label>
                        <div className="form__action">
                            <a href="/registrar" className="btn__out">
                                Registrate
                            </a>
                            <button type="submit" className="btn" >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

if (document.getElementById("login")) {
    ReactDOM.render(<Login />, document.getElementById("login"));
}
