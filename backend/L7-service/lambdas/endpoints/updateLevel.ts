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

    const cardData = JSON.parse(event.body);

    if (!cardData.CardID) {
        return Responses._400({message: 'not enough Information'});
    }

    // write data to dynamoDB table
    const req = await Dynamo.update(UserId, cardData.CardID, cardData.Correct, tableName);

    if (!req) {
        return Responses._400({message: 'Failed to update card level'});
    }

    return Responses._201("Updated card level");
}
