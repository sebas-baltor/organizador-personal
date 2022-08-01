import React, { useRef }  from "react";
import { BsFillPenFill } from "react-icons/bs";
import "./Navbar.scss"


function Nav (){
    function ifLoged(){
        if(localStorage.getItem("status")==="loged"){
            return (<>  
                <div className="navbar__item"><a href="/tareas">Tareas</a></div>
                <div className="navbar__item"><a href="/crear">Crear</a></div>
                <a className="btn__out" href="/" id="logout" onClick={()=>{
                    localStorage.removeItem("status");
                    localStorage.removeItem("token");
                }}>Logout</a>
                </>
                )
        }else{
            return(
                <a className="btn" href="/login">Log in</a>
            )
        }
    }

        return(
            <nav className="navbar">
                <BsFillPenFill className="navbar__logo"/>
                <div className="navbar__link">
                    <div className="navbar__item"><a href="/">Home</a></div>
                    {/* <div className="navbar__item"><a href="/tareas">Tareas</a></div>
                    <div className="navbar__item"><a href="/crear">Crear</a></div>
                    
                    <a className="btn" href="/login">Log in</a> */}
                    {ifLoged()}
                </div>
            </nav>
        )
    }


export default Nav;