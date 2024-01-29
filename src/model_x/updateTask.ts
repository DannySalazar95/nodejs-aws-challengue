import {APIGatewayProxyHandler} from 'aws-lambda'
import DBConnection from './services/DBConnection'
import DBConnectionDynamo from './services/DBConnectionDynamo'

export const handler: APIGatewayProxyHandler = async (event) => {

    const { pathParameters } = event;

    if (pathParameters == null) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: 'BAD_REQUEST'})
        };
    }

    const { id_task } = pathParameters;

    if (typeof id_task == 'undefined') {
        return {
            statusCode: 400,
            body: JSON.stringify({message: 'BAD_REQUEST'})
        };
    }

    if (event.body == null) {
        return {
            statusCode: 422,
            body: JSON.stringify({message: 'UNPROCESSABLE_ENTITY'})
        };
    }

    const { title, description } = JSON.parse(event.body)

    if (typeof title == 'undefined' || typeof description == 'undefined') {
        return {
            statusCode: 422,
            body: JSON.stringify({message: 'UNPROCESSABLE_ENTITY'})
        };
    }

    const dbConnection: DBConnection = new DBConnectionDynamo()
    await dbConnection.generateConnection().updateTask(id_task, title, description)

    return {
        statusCode: 200,
        body: "Task updated"
    }
}
