import React, {useCallback, useState} from "react";
import s from "../TaskBar/Taskbar.module.scss";
import TaskModal from "../TaskModal/TaskModal";
import {deleteTaskAPI} from "../../api/deleteTaskAPI";
import {updateTaskStatusAPI} from "../../api/updateTask";
import change from '../../assets/change.png'
import bin from '../../assets/bin.png'
import {TaskPropsType} from "./Task.type";

const Task: React.FC<TaskPropsType> = React.memo(({taskId, title, todoId, completed, subTitle, userId}) => {

    const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

    const inputChangeHandler = useCallback(() => {
        updateTaskStatusAPI(userId, todoId, taskId, completed)
    }, [userId, todoId, taskId, completed])

    const deleteTaskHelper = useCallback(async () => {
        await deleteTaskAPI(userId, todoId, taskId)
    }, [userId, todoId, taskId])

    const showTaskModalHelper = useCallback(() => {
        setShowTaskModal(true)
    }, [setShowTaskModal])

    return (
        <li>
            <div className={s.task}>
                <div className={s.labelWrapper}>
                    <label className={s.labelCheckbox}>
                        <input
                            defaultChecked={completed}
                            onChange={inputChangeHandler}
                            type="checkbox"
                            className={s.checkInput}
                            id={taskId}
                        />
                        <span className={s.checkbox}/>
                        <span
                            className={`${s.labelText} ${
                                completed && s.completed
                            }`}
                        >
                            {title}
                        </span>
                    </label>
                </div>
                <div>
                    <img
                        onClick={showTaskModalHelper}
                        src={change}
                        alt="Info"
                    />
                    <img
                        onClick={deleteTaskHelper}
                        className={s.bin}
                        src={bin}
                        alt="Bin"
                    />
                </div>
            </div>
            {showTaskModal && (
                <TaskModal
                    userId={userId}
                    change
                    taskId={taskId}
                    btnTitle="Change Task"
                    showModal={setShowTaskModal}
                    taskTitle={title}
                    title="Change Task"
                    subTitle={subTitle}
                    todoId={todoId}
                />
            )}
        </li>
    );
});

export default Task;
