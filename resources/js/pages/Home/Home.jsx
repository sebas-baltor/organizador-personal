import React from "react";
import ReactDOM from "react-dom";
import { Navbar, Main } from "../index.js";



function Home() {
        return (
            <>
                <Navbar />
                <Main 
                title="Organiza tu dia de la manera mas facil!!" 
                text="Crea tareas de una manera organizada, gestiona tu dia a traves de esta herramienta gratuita y sencilla de usar."
                />
            </>
        );
    }

export default Home;

if (document.getElementById("home")) {
    ReactDOM.render(<Home />, document.getElementById("home"));
}
