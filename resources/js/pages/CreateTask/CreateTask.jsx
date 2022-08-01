import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Navbar } from "../index";
import axios from "axios";

import "./CreateTask.scss";

function CreateTask() {
    let [infoToCreateTask, setInfoToCreateTask] = useState({
        categories: [],
        states: [],
        types: [],
    });
    useEffect(() => {
        axios
            .post("/obtener/todo", {
                remember_token: localStorage.getItem("token"),
            })
            .then((res) => {
                setInfoToCreateTask({
                    categories: res.data.categories,
                    states: res.data.states,
                    types: res.data.types,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let [task, setTask] = useState({
        remember_token: localStorage.getItem("token"),
        task_title: "",
        task_description: "",
        type_id: "",
        category_id: "",
        state_id: "",
        date_end: "",
        date_reminder: "",
    });
    function handleChange(e) {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
        axios.post("/crear/tarea", task).then((res) => {
            console.log(res);
            window.location.href = "/tareas";
        }).catch((err) => {
            console.dir(err);
        })
    }
    return (
        <>
            <Navbar />
            <section className="createtask">
                <div className="createtask__create">
                    <form
                        className="createtask__form"
                        onSubmit={handleSubmit}
                        method="POST"
                        action="/crear/tarea"
                    >
                        <h1>Crear Tarea</h1>
                        <label>
                            Titulo:
                            <input
                                type="text"
                                name="task_title"
                                value={task.task_title}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Cuando debe ser completada la tarea:
                            <input
                                type="date"
                                name="date_end"
                                value={task.date_end}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Tipo:
                            <select
                                name="type_id"
                                value={task.type_id}
                                onChange={handleChange}
                            >
                                <option value="Ninguo">Ninguno</option>
                                {infoToCreateTask.types.map((type) => {
                                    return (
                                        <option
                                            key={type.type_id}
                                            value={type.type_id}
                                        >
                                            {type.type_task}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>
                        <label>
                            Categoria:
                            <select
                                name="category_id"
                                value={task.category_id}
                                onChange={handleChange}
                            >
                                <option value="Ninguo">Ninguno</option>

                                {infoToCreateTask.categories.map((category) => {
                                    return (
                                        <option
                                            key={category.category_id}
                                            value={category.category_id}
                                        >
                                            {category.category_type}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>
                        <label>
                            Estado:
                            <select
                                name="state_id"
                                value={task.state_id}
                                onChange={handleChange}
                            >
                                <option value="Ninguno">Ninguno</option>

                                {infoToCreateTask.states.map((state) => {
                                    return (
                                        <option
                                            key={state.state_id}
                                            value={state.state_id}
                                        >
                                            {state.state_type}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>
                        <label>
                            Quieres que tenga un recordatorio?
                            <input
                                type="date"
                                name="date_reminder"
                                value={task.date_reminder}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Que hay que hacer:
                            <textarea
                                name="task_description"
                                rows="10"
                                value={task.task_description}
                                onChange={handleChange}
                            ></textarea>
                        </label>

                        <button type="submit" className="btn">
                            Crear
                        </button>
                    </form>
                </div>
                {/* <div className="createtask__more">
                    <h2>Tareas pendientes por redactar</h2>
                    <br />
                    <div className="createtask__pending">pendiente1</div>
                </div> */}
            </section>
        </>
    );
}

export default CreateTask;

if (document.getElementById("create_task")) {
    ReactDOM.render(<CreateTask />, document.getElementById("create_task"));
}
