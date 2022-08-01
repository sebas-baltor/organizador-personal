import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Navbar, SingleTask } from "../index.js";
import { BsCardChecklist } from "react-icons/bs";
import { FiChevronUp } from "react-icons/fi";
import { BiPlus, BiPurchaseTag, BiNetworkChart } from "react-icons/bi";
import { TbAtom2 } from "react-icons/tb";

import "./Task.scss";
import axios from "axios";

function Task() {
    let [tasks, setTasks] = useState([]);
    let [category, setCategory] = useState([]);
    let [type, setType] = useState([]);
    let [state, setState] = useState([]);
    useEffect(() => {
        axios
            .post("/tareas", { remember_token: localStorage.getItem("token") })
            .then((response) => {
                let res = response.data;
                setTasks(res.tasks);
                setCategory(res.category);
                setType(res.type);
                setState(res.state);
            })
            .catch((e) => {});
    }, []);
    function handlerSubmitTaskByType(e) {
        e.preventDefault();
        axios
            .post("/tareas/by-type", {
                [e.target.name]: e.target.value,
                remember_token: localStorage.getItem("token"),
            })
            .then((res) => {
                setTasks(res.data.tasks);
                handlerInfoRef(res.data.tasks.length);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    function handlerSubmitTaskByCategory(e) {
        e.preventDefault();
        axios
            .post("/tareas/by-category", {
                [e.target.name]: e.target.value,
                remember_token: localStorage.getItem("token"),
            })
            .then((res) => {
                setTasks(res.data.tasks);
                handlerInfoRef(res.data.tasks.length);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    function handlerSubmitTaskByState(e) {
        e.preventDefault();
        axios
            .post("/tareas/by-state", {
                [e.target.name]: e.target.value,
                remember_token: localStorage.getItem("token"),
            })
            .then((res) => {
                setTasks(res.data.tasks);
                handlerInfoRef(res.data.tasks.length);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    // controlar el css
    let catRef = useRef(null);
    let typeRef = useRef(null);
    let stateRef = useRef(null);
    let allRef = useRef(null);
    let infoRef = useRef(null);
    function handlerAll() {
        allRef.current.classList.add("active");
    }
    function handlerExpandType() {
        typeRef.current.classList.toggle("expand");
    }
    function handlerExpandState() {
        stateRef.current.classList.toggle("expand");
    }
    function handlerExpandCategory() {
        catRef.current.classList.toggle("expand");
    }
    function handlerRemoveExpand() {
        typeRef.current.classList.remove("expand");
        stateRef.current.classList.remove("expand");
        catRef.current.classList.remove("expand");
        allRef.current.classList.remove("active");
    }
    function handlerInfoRef(l) {
        if (l == 0) {
            infoRef.current.classList.add("active");
        } else {
            infoRef.current.classList.remove("active");
        }
    }
    return (
        <>
            <Navbar />
            <div className="task__container">
                <div className="task__orderby">
                    <h2 className="subtitle">Mostrar por:</h2>
                    <div className="orderby">
                        <div className="orderby__item">
                            <form
                                className="orderby__option"
                                onClick={handlerRemoveExpand}
                                action="/tareas"
                                method="POST"
                            >
                                <label
                                    className="orderby__option--lonly"
                                    htmlFor="all"
                                    ref={allRef}
                                    onClick={handlerAll}
                                >
                                    <BsCardChecklist />
                                    Todo
                                </label>
                                <input
                                    className="orderby__option--radio"
                                    type="button"
                                    name="remember_token"
                                    id="all"
                                    value="all"
                                    onClick={() => {
                                        location.reload();
                                    }}
                                />
                            </form>
                        </div>
                        <div className="orderby__item">
                            <span
                                className="orderby__expand"
                                ref={catRef}
                                onClick={handlerExpandCategory}
                            >
                                <BiPurchaseTag />
                                categoria
                                <FiChevronUp className="chevronup" />
                            </span>
                            <form className="orderby__expand--c">
                                {category.map((cat) => {
                                    return (
                                        <div
                                            className="orderby__option"
                                            onClick={handlerRemoveExpand}
                                            key={cat.category_id}
                                        >
                                            <label
                                                className="orderby__option--label"
                                                htmlFor={cat.category_type}
                                            >
                                                {cat.category_type}
                                            </label>
                                            <input
                                                className="orderby__option--radio"
                                                type="submit"
                                                name="category_id"
                                                id={cat.category_type}
                                                value={cat.category_id}
                                                onClick={
                                                    handlerSubmitTaskByCategory
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </form>
                        </div>
                        <div className="orderby__item">
                            <span
                                className="orderby__expand"
                                ref={typeRef}
                                onClick={handlerExpandType}
                            >
                                <BiNetworkChart />
                                tipos
                                <FiChevronUp className="chevronup" />
                            </span>
                            <form className="orderby__expand--c">
                                {type.map((type) => {
                                    
                                    return (
                                        <div
                                            className="orderby__option"
                                            onClick={handlerRemoveExpand}
                                            key={type.type_id}
                                        >
                                            <label
                                                className="orderby__option--label"
                                                htmlFor={type.type_task}
                                            >
                                                {type.type_task}
                                            </label>
                                            <input
                                                className="orderby__option--radio"
                                                type="submit"
                                                name="type_id"
                                                id={type.type_task}
                                                value={type.type_id}
                                                onClick={
                                                    handlerSubmitTaskByType
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </form>
                        </div>
                        <div className="orderby__item">
                            <span
                                className="orderby__expand"
                                ref={stateRef}
                                onClick={handlerExpandState}
                            >
                                <TbAtom2 />
                                estados
                                <FiChevronUp className="chevronup" />
                            </span>
                            <form className="orderby__expand--c">
                                {state.map((state) => {
                                    return (
                                        <div
                                            className="orderby__option"
                                            onClick={handlerRemoveExpand}
                                            key={state.state_id}
                                        >
                                            <label
                                                className="orderby__option--label"
                                                htmlFor={state.state_type}
                                            >
                                                {state.state_type}
                                            </label>
                                            <input
                                                className="orderby__option--radio"
                                                type="submit"
                                                name="state_id"
                                                id={state.state_type}
                                                value={state.state_id}
                                                onClick={
                                                    handlerSubmitTaskByState
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </form>
                        </div>
                    </div>
                </div>
                <h4 className="subtitle__info" ref={infoRef}>
                    No tienes tareas con esas caracteristicas{" "}
                    <a href="/crear/tarea" className="highlight">
                        por favor crea una
                    </a>{" "}
                    o escoge otra opcion.
                </h4>
                <div className="task__grid">
                    {tasks.map((task) => {
                        return (
                            <SingleTask
                            title={task.task_title}
                            tag={task.category_type}
                            type={task.type_task}
                            text={task.task_description}
                            key={task.task_id}
                            taskId={task.task_id}
                            state={task.state_type}
                            dateEnd={task.date_end}
                            />
                            );
                        
                    })}
                </div>
            </div>
            <a href="/crear/tarea" className="task__create">
                <BiPlus />
            </a>
        </>
    );
}
export default Task;

if (document.getElementById("task")) {
    ReactDOM.render(<Task />, document.getElementById("task"));
}
