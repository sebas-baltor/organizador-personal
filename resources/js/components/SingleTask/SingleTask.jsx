import React, { useRef } from "react";
import { BiNetworkChart,BiPurchaseTag } from "react-icons/bi";
import { FiChevronUp } from "react-icons/fi";
import { TbAtom2 } from "react-icons/tb";
import { IoCheckmarkDoneSharp } from "react-icons/io5";



import "./SingleTask.scss";
import axios from "axios";

function SingleTask(props) {
    let dateEnd = new Date(props.dateEnd);

    let textExpand = useRef(null);
    let chevronIcon = useRef(null);
    function textExpandController() {
        textExpand.current.classList.toggle("expand");
        chevronIcon.current.classList.toggle("rotate");
    }
    function renderTagByColor(t) {
        switch (t) {
            case "Trabajo":
                return <span className="tag tag__primary"><BiPurchaseTag /> {t}</span>;
                break;
            case "Personal":
                return <span className="tag tag__secondary"><BiPurchaseTag /> {t}</span>;
                break;
            case "Tarea":
                return <span className="tag tag__third"><BiPurchaseTag /> {t}</span>;
                break;
            case "Escuela":
                return <span className="tag tag__fourth"><BiPurchaseTag /> {t}</span>;
                break;
            default:
                return <span className="tag tag__default"><BiPurchaseTag /> {t}</span>;
                break;
        }
    }
    function handlerDeleteTask(e){
        e.preventDefault();
        axios.post("/eliminar/tarea",{
            task_id:props.taskId
        }).then(res=>{
            console.log(res.data);
        }).catch(err=>{
            console.dir(err);
        })
        location.reload();

    }
    return (
        <div>
            <div className="task">
                <div className="task__header">
                    <div className="task__header--top">
                        <span className="top__id">{props.taskId}</span>
                        <span className="top__type">
                            {props.type} <BiNetworkChart />
                        </span>
                    </div>
                    <div className="task__header--title">
                        <h3>{props.title}</h3>
                    </div>
                    <div className="task__header--tag">
                        {renderTagByColor(props.tag)}
                    </div>
                </div>
                <div className="task__body expand">
                    <div className="task__body--content">
                        <div
                            className="show"
                            onClick={textExpandController}
                            ref={chevronIcon}
                        >
                            <FiChevronUp className="icon" />
                        </div>
                        <div className="task__body--text" ref={textExpand}>
                            <p>{props.text}</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="task__footer">
                    <form action="/eliminar/tarea" method="POST" className="task__footer--btn" >
                        <button type="submit" onClick={handlerDeleteTask}>
                            <IoCheckmarkDoneSharp />
                        </button>
                    </form>
                    <div>
                        <div className="task__footer--state">
                            {props.state} <TbAtom2 />
                        </div>
                        <div className="task__footer--date">
                            <span className="day">Completar antes del: {dateEnd.getDay()}</span>/
                            <span className="month">{dateEnd.getMonth()}</span>/
                            <span className="year">
                                {dateEnd.getFullYear()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleTask;
