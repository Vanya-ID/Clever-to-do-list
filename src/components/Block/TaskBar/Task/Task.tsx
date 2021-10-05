import React, { useState } from "react";
import s from "../Taskbar.module.scss";
import TaskModal from "../../../TaskModal/TaskModal";
import { deleteTaskAPI } from "../../../../api/deleteTaskAPI";
import { updateTaskStatusAPI } from "../../../../api/updateTask";

type TaskPropsType = {
  taskId: string
  title: string
  todoId: string
  completed: boolean
  subTitle: string
  userId: string
}

const Task: React.FC<TaskPropsType> = React.memo((props) => {
  const { taskId, title, todoId, completed, subTitle, userId } = props;

  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

  return (
    <li>
      <div className={s.task}>
        <div className={s.labelWrapper}>
          <label className={s.labelCheckbox}>
            <input
              defaultChecked={completed}
              onChange={() =>
                updateTaskStatusAPI(
                  userId,
                  todoId,
                  taskId,
                  completed
                )
              }
              type="checkbox"
              className={s.checkInput}
              id={taskId}
            />
            <span className={s.checkbox} />
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
            onClick={() => setShowTaskModal(true)}
            src="/change.png"
            alt=""
          />
          <img
            onClick={() => deleteTaskAPI(userId, todoId, taskId)}
            className={s.bin}
            src="/bin.png"
            alt=""
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
