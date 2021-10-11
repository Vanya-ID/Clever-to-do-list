import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import s from "./TaskModal.module.scss";
import {addTaskAPI} from "../../api/addTaskAPI";
import {deleteTaskAPI} from "../../api/deleteTaskAPI";
import {updateTaskDescriptionAPI, updateTaskTitleAPI} from "../../api/updateTask";
import {TaskModalPropsType} from "./TaskModal.type";


const TaskModal: React.FC<TaskModalPropsType> = React.memo(({
                                                                title,
                                                                showModal,
                                                                todoId,
                                                                taskTitle,
                                                                btnTitle,
                                                                taskId,
                                                                subTitle,
                                                                change,
                                                                userId
                                                            }) => {

    const [text, setText] = useState<string>(taskTitle ?? "");
    const [date, setDate] = useState<string>(todoId ?? "");
    const [description, setDescription] = useState<string>(subTitle ?? "");
    const [editMode, setEditMode] = useState<boolean>(!change);

    const inputChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        setText(e.currentTarget.value), []);
    const textareaChangeHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) =>
        setDescription(e.currentTarget.value), []);
    const onBlurHandler = useCallback(() => change && setEditMode(false), [change]);
    const doubleClickHandler = useCallback(() => setEditMode(!editMode), [editMode]);
    const dateChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        setDate(e.currentTarget.value), []);

    const addTaskForDay = useCallback(async () => {
        if (date === todoId) {
            if (change) {
                await shouldChangeTask()
            } else {
                await addTaskAPI(userId, todoId, text, description);
            }
        } else {
            change && (await deleteTaskAPI(userId, todoId, taskId ?? ""));
            await addTaskAPI(userId, date, text, description);
        }
        showModal(false);
    }, [change, date, description, taskId, todoId, showModal, text, userId]);

    const shouldChangeTask = useCallback(async () => {
        await updateTaskTitleAPI(userId, todoId, taskId ?? "", text);
        await updateTaskDescriptionAPI(
            userId,
            todoId,
            taskId ?? "1",
            description
        );
    }, [description, userId, todoId, taskId, text])

    const onKeyDownHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && addTaskForDay(), [addTaskForDay]);

    const addTaskForDayHandler = useCallback(async () => {
        await addTaskForDay()
    }, [addTaskForDay])

    const closeModalHandler = useCallback(() => {
        showModal(false)
    }, [showModal])

    return (
        <>
            <div className={s.background} onClick={closeModalHandler}/>
            <div className={s.modal}>
                <div className={s.closeModal} onClick={closeModalHandler}>
                    X
                </div>
                <div className={s.modal_container}>
                    {title && <h4>{title}</h4>}
                    <input
                        autoFocus
                        className={s.taskInput}
                        placeholder="Enter Task..."
                        onChange={inputChangeHandler}
                        onKeyDown={onKeyDownHandler}
                        value={text}
                        type="text"
                    />{text.trim().length > 20 &&
                <span className={s.error}>Must be less than 20 symbols!</span>}
                    {editMode ? (
                        <textarea
                            onBlur={onBlurHandler}
                            onChange={textareaChangeHandler}
                            value={description}
                            className={`${s.subTitle}`}
                        />
                    ) : (
                        <div
                            onDoubleClick={doubleClickHandler}
                            className={`${s.subTitle}`}
                        >
                            {description}
                        </div>
                    )}
                    <input
                        className={s.taskInput}
                        onChange={dateChangeHandler}
                        value={date}
                        type="date"
                    />
                    <button
                        disabled={!text.trim() || text.trim().length > 20}
                        className={s.button}
                        onClick={addTaskForDayHandler}
                    >
                        {btnTitle}
                    </button>
                </div>
            </div>
        </>
    );
});

export default TaskModal;
