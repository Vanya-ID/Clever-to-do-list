import React, {useCallback, useEffect, useState} from 'react'
import {CURRENT_YEAR} from '../../constants'
import s from './Taskbar.module.scss'
import Task from '../Task/Task'
import TaskModal from '../TaskModal/TaskModal'
import {getTasksAPI} from '../../api/getTasksAPI'
import Preloader from '../Preloder/Preloader'
import {TaskbarPropsType, TasksType} from "./Taskbar.type";

const Taskbar: React.FC<TaskbarPropsType> = React.memo(
    ({dayNumber, month, userId}) => {
        const todoId = `${CURRENT_YEAR.toString()}-${`0${month}`.slice(
            -2
        )}-${`0${dayNumber}`.slice(-2)}`

        const [
            showTaskModalFromTaskbar,
            setShowTaskModalFromTaskbar,
        ] = useState<boolean>(false)
        const [preloader, setPreloader] = useState<boolean>(false)
        const [currentTasks, setCurrentTasks] = useState<TasksType[]>([])

        useEffect(() => {
            const {tasksRef, valueListenerHandler} = getTasksAPI(
                userId,
                setCurrentTasks,
                todoId,
                setPreloader
            )
            return () => {
                tasksRef.off('value', valueListenerHandler)
            }
        }, [todoId, userId])

        const showModalHelper = useCallback(() => {
            setShowTaskModalFromTaskbar(true)
        }, [])

        return (
            <>
                <div className={s.taskbar_wrapper}>
                    {preloader ? (
                        <Preloader/>
                    ) : (
                        <>
                            <div>
                                <p>
                                    Day
                                    <span> {dayNumber} </span>
                                    Tasks
                                </p>
                                <ul>
                                    {currentTasks.map((t) => (
                                        <Task
                                            key={t.id}
                                            userId={t.userId}
                                            todoId={todoId}
                                            taskId={t.id}
                                            title={t.title}
                                            completed={t.completed}
                                            subTitle={t.description}
                                        />
                                    ))}
                                </ul>
                            </div>
                            <button
                                className={s.addTaskBtn}
                                onClick={showModalHelper}
                            >
                                Add task
                            </button>
                        </>
                    )}
                </div>
                {showTaskModalFromTaskbar && (
                    <TaskModal
                        userId={userId}
                        change={false}
                        btnTitle="Add Task"
                        todoId={todoId}
                        title={`${dayNumber} Day`}
                        showModal={setShowTaskModalFromTaskbar}
                    />
                )}
            </>
        )
    }
)

export default Taskbar
