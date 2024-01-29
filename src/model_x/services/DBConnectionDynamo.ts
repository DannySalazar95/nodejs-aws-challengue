import {DynamoDBClient} from '@aws-sdk/client-dynamodb'
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    ScanCommand,
    UpdateCommand
} from '@aws-sdk/lib-dynamodb'
import {TaskConfig} from '../config/Task'
import {randomUUID} from 'crypto'
import DBConnection from './DBConnection';
import Task from '../model/Task';

export default class DBConnectionDynamo implements DBConnectionDynamo {

    private ddbDocClient: DynamoDBDocumentClient;

    generateConnection():DBConnection  {
        this.ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({region: TaskConfig.AWS_REGION}))
        return this
    }
    async createTask(title: string, description: string): Promise<Task> {
        let taskToCreated = {
            id: randomUUID(),
            title,
            description,
            createdAt: new Date().toISOString()
        }

        await this.ddbDocClient.send(new PutCommand({
            TableName: TaskConfig.TABLE,
            Item: taskToCreated
        }))

        return new Task(
            taskToCreated.id,
            taskToCreated.title,
            taskToCreated.description,
            taskToCreated.createdAt)
    }
    async deleteTask(id_task: string) {
        await this.ddbDocClient.send(new DeleteCommand({
            TableName: TaskConfig.TABLE,
            Key: { id: id_task }
        }));
    }
    async getTasks(): Promise<Task[]> {
        let response = await this.ddbDocClient.send(
            new ScanCommand({TableName: TaskConfig.TABLE}))

        return response.Items.map(element => {
            return new Task(element.id, element.title, element.description, element.createdAt)
        });
    }
    async getTask(id_task: string): Promise<Task> {
        let response = await this.ddbDocClient.send(new GetCommand({
            TableName: TaskConfig.TABLE,
            Key: { id: id_task }
        }))

        return new Task(
            response.Item?.id,
            response.Item?.title,
            response.Item?.description,
            response.Item?.createdAt)
    }
    async updateTask(id_task: string, title: string, description: string) {
        await this.ddbDocClient.send(
            new UpdateCommand({
                TableName: TaskConfig.TABLE.toString(),
                Key: { id: id_task },
                UpdateExpression: "set title = :title, description = :description",
                ExpressionAttributeValues: {
                    ":title": title,
                    ":description": description
                },
                ReturnValues: 'ALL_NEW'
            }))
    }
}
