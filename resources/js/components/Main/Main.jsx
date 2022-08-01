import React from 'react'
import "./Main.scss"
import image from "../home.png"

function Main (props){
    function handlerClick(){
        if(localStorage.status==="loged"){
            window.location.href="/tareas";
        }else{
            window.location.href="/login";
        }
    }
        return(
            <main className='main'>
                <div className="twosection">
                    <div className="subsection__content">
                        <h1 className='title'>{props.title}</h1>
                        <p className='text'>{props.text}</p>
                        <button className='btn' onClick={handlerClick}>comenzar</button>
                    </div>
                    <div className="subsection">
                        <img src={image} alt="img" />
                    </div>
                </div>
            </main>
        )
    }


export default Main