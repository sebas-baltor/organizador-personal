import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FormSingleInput, Navbar, Item } from "../index";
import axios from "axios";

import "./Create.scss";

function Create() {
    let [category, setCategory] = useState([]);
    let [state, setState] = useState([]);
    let [type, setType] = useState([]);

    // cambia los estados cada vez que se carga la pagina
    useEffect(() => {
        axios
            .post("/obtener/todo", {
                remember_token: localStorage.getItem("token"),
            })
            .then((res) => {
                setCategory(res.data.categories);
                setState(res.data.states);
                setType(res.data.types);
                // console.log(res.data);
            });
    }, []);
    return (
        <>
            <Navbar />
            <div className="create">
                <div className="create__section">
                    <div className="create__form">
                        <FormSingleInput
                            key="0"
                            action="/crear/categoria"
                            inputName="category_type"
                            bg="bg__primary"
                            title="Crea una nueva categoria"
                        />
                    </div>
                    <div className="create__items">
                        <h3>Tus categorias</h3>
                        <div className="create__items--show">
                            {category.map((cat) => {
                                return (
                                    <Item
                                        bg="bg__primary"
                                        key={cat.category_id}
                                        itemId={cat.category_id}
                                        itemAction="/eliminar/categoria"
                                        itemNameDelete="category_id"
                                        title={cat.category_type}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="create__section">
                    <div className="create__form">
                        <FormSingleInput
                            key="1"
                            action="/crear/tipo"
                            inputName="type_task"
                            bg="bg__secondary"
                            title="Crea un nuevo tipo"
                        />
                    </div>
                    <div className="create__items">
                        <h3>Tus tipos</h3>
                        <div className="create__items--show">
                            {type.map((t) => {
                                return (
                                    <Item
                                        bg="bg__secondary"
                                        key={t.type_id}
                                        itemId={t.type_id}
                                        itemAction="/eliminar/tipo"
                                        itemNameDelete="type_id"
                                        title={t.type_task}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="create__section">
                    <div className="create__form">
                        <FormSingleInput
                            key="2"
                            action="/crear/estado"
                            inputName="state_type"
                            bg="bg__third"
                            title="Crea un nuevo estado"
                        />
                    </div>
                    <div className="create__items">
                        <h3>Tus estados</h3>
                        <div className="create__items--show">
                            {state.map((s) => {
                                return (
                                    <Item
                                        bg="bg__third"
                                        key={s.state_id}
                                        itemId={s.state_id}
                                        itemAction="/eliminar/estado"
                                        itemNameDelete="state_id"
                                        title={s.state_type}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Create;

if (document.getElementById("create")) {
    ReactDOM.render(<Create />, document.getElementById("create"));
}
