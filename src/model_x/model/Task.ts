import { randomUUID } from 'crypto'

export default class Task {
    id: string
    title: string
    description: string
    createdAt: string

    constructor(id: string | null, title: string, description: string, createdAt: string) {
        this.id = id ?? randomUUID()
        this.title = title
        this.description = description
        this.createdAt = createdAt
    }
}