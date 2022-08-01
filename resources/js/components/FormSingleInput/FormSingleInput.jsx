import axios from "axios";
import React, { useState, useRef } from "react";

import "./FormSingleInput.scss";

function FormSingleInput(props) {
    // estado y referencia del input
    let [value, setValue] = useState("");
    let input = useRef(null);

    // creamos una nueva categoria - tipo - estado
    function handdlerClick(e) {
        axios
            .post(props.action, {
                [props.inputName]: value,
                remember_token: localStorage.getItem("token")
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {});
        setValue("");
    }
    // agregamos el valor de un input ya que esta relacionado al state
    function handdlerInputValue() {
        setValue(input.current.value);
    }
    return (
        <div className="header">
            <div>
                <h1>{props.title}</h1>
            </div>
            <form className={"form " + props.bg}>
                <label className="form__label" htmlFor="new">
                    Nombre:
                </label>
                <input
                    ref={input}
                    type="text"
                    className="form__input"
                    id="new"
                    name={props.inputName}
                    value={value}
                    onChange={handdlerInputValue}
                />
                <button className="btn" type="submit" onClick={handdlerClick}>
                    Crear
                </button>
            </form>
        </div>
    );
}

export default FormSingleInput;
