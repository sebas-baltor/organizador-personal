import React, { useRef, useState } from "react";
import "./Item.scss";
import { FiTrash } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import axios from "axios";

export default function Item(props) {
    let refForm = useRef(null),
        refButton = useRef(null),
        refContainer = useRef(null);
    // let [value, setValue] = useState({
    //     [props.itemInputName]: props.itemId,
    // });
    function handdlerRefForm() {
        refContainer.current.classList.toggle("active");
        refForm.current.classList.toggle("active");
        refButton.current.classList.toggle("active");
    }
    function handleClickDelete() {
        let config = {
            remember_token:localStorage.getItem("token"),
            [props.itemNameDelete]: props.itemId,
            confirm_action:0
        };
        axios
            .post(props.itemAction, config)
            .then((res) => {
                console.log(res.data);
                // alert(res.data.message);
            })
            .catch((err) => {
                console.dir(err);
            });
    }
    // console.log(props);
    return (
        <div>
            <div className={"item " + props.bg} ref={refContainer}>
                <h4 className="item__title">{props.title}</h4>
                {/* <div className="item__actions">
                    <button className="btn" onClick={handleClickDelete}>
                        <FiTrash />
                    </button>
                    <button
                        className="btn"
                        onClick={handdlerRefForm}
                        ref={refButton}
                    >
                        <FaEdit className="edit" />
                        <CgClose className="close" />
                    </button>
                </div> */}
                {/* <div className="item__form" ref={refForm}>
                    <form>
                        <label htmlFor="change">Nuevo nombre</label>
                        <input type="text" name={props.itemInputName} />
                        <button className="btn" type="submit">
                            Confirmar
                        </button>
                    </form>
                </div> */}
            </div>
        </div>
    );
}
