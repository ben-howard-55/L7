import { APIGatewayProxyHandler } from "aws-lambda";
const AWS = require('aws-sdk');
import Responses from '../common/API_Responses';
import Dynamo from '../common/Dynamo';

// main
const tableName = process.env.tableName;

export const handler: APIGatewayProxyHandler = async event => {
    console.log('event', event);

    let UserId = event.requestContext.authorizer.claims?.sub;
  
    if (!UserId) {
        // user unauthorized
        return Responses._401({message: 'user unauthorized'});
    }

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({message: 'missing ID from path'});
    }

    let CardId = event.pathParameters.ID;

    const req = await Dynamo.get(UserId, CardId, tableName);

    if (!req) {
        return Responses._400({message: 'Failed to get Card by CardID', user: UserId, card: CardId});
    }

    return Responses._200({req});
}
