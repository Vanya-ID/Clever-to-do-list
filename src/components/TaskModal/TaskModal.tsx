import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./TaskModal.module.scss";
import { addTaskAPI } from "../../api/addTaskAPI";
import { deleteTaskAPI } from "../../api/deleteTaskAPI";
import {
  updateTaskDescriptionAPI,
  updateTaskTitleAPI
} from "../../api/updateTask";

type TaskModalPropsType = {
  showModal: (value: boolean) => void
  title: number | string
  todoId: string
  taskTitle?: string
  subTitle?: string
  taskId?: string
  btnTitle: string
  change: boolean
  userId: string
}

const TaskModal: React.FC<TaskModalPropsType> = React.memo((props) => {
  const {
    title,
    showModal,
    todoId,
    taskTitle,
    btnTitle,
    taskId,
    subTitle,
    change,
    userId
  } = props;

  const [text, setText] = useState<string>(taskTitle ?? "");
  const [date, setDate] = useState<string>(todoId ?? "");
  const [description, setDescription] = useState<string>(subTitle ?? "");
  const [editMode, setEditMode] = useState<boolean>(!change);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);
  const textareaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.currentTarget.value);
  const onBlurHandler = () => change && setEditMode(false);
  const doubleClickHandler = () => setEditMode(!editMode);
  const dateChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setDate(e.currentTarget.value);

  const addTaskForDay = async () => {
    if (date === todoId) {
      if (change) {
        await updateTaskTitleAPI(userId, todoId, taskId ?? "", text);
        await updateTaskDescriptionAPI(
          userId,
          todoId,
          taskId ?? "1",
          description
        );
      } else {
        await addTaskAPI(userId, todoId, text, description);
      }
    } else {
      change && (await deleteTaskAPI(userId, todoId, taskId ?? ""));
      await addTaskAPI(userId, date, text, description);
    }
    showModal(false);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && addTaskForDay();

  return (
    <>
      <div className={s.background} onClick={() => showModal(false)} />
      <div className={s.modal}>
        <div className={s.closeModal} onClick={() => showModal(false)}>
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
            onClick={() => addTaskForDay()}
          >
            {btnTitle}
          </button>
        </div>
      </div>
    </>
  );
});

export default TaskModal;
