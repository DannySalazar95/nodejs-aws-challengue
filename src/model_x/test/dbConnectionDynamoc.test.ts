import {describe, expect, test, jest, beforeEach} from '@jest/globals';
import DBConnectionDynamo from "../services/DBConnectionDynamo";
import { mockClient } from "aws-sdk-client-mock";
import {DynamoDBDocumentClient, GetCommand, PutCommand} from "@aws-sdk/lib-dynamodb";

jest.mock('axios');

const ddbMock = mockClient(DynamoDBDocumentClient);
beforeEach(() => {
    ddbMock.reset();
});

describe('db connection dynamo module', () => {

    test('create task', async () => {
        let title = 'Hello world';
        let description = 'dynamodb aws nodejs';

        ddbMock.on(PutCommand).resolves({});

        const data = await (new DBConnectionDynamo())
            .generateConnection()
            .createTask(title,description);

        expect(data).toHaveProperty('createdAt');
        expect(data).toHaveProperty('id');
        expect(data.title).toBe(title);
        expect(data.description).toBe(description);
    });

    test('get task', async () => {
        let id_task = '47fjfk38dddf44';
        let title = 'Hello world';
        let description = 'dynamodb aws nodejs';

        ddbMock.on(GetCommand).resolves({
            Item: { id: id_task, title, description, createAt: ''},
        });

        const data = await (new DBConnectionDynamo())
            .generateConnection()
            .getTask(id_task);

        expect(data).toHaveProperty('createdAt');
        expect(data).toHaveProperty('id');
        expect(data.id).toBe(id_task);
    });
});
