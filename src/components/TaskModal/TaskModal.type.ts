export type TaskModalPropsType = {
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
