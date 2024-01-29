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

    const dbConnection: DBConnection = new DBConnectionDynamo()
    let task = await dbConnection
        .generateConnection()
        .getTask(id_task)

    return {
        statusCode: 200,
        body: JSON.stringify(task)
    }
}
