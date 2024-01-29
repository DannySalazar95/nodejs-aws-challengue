import Task from "../model/Task"

export default interface DBConnection {
    generateConnection(): DBConnection
    createTask(title: string, description: string): Promise<Task>
    deleteTask(id_task: string): void
    getTasks(): Promise<Task[]>
    getTask(id_task: string): Promise<Task>
    updateTask(id_task: string, title: string, description: string): void
}
