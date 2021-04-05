import { APIGatewayProxyHandler } from "aws-lambda";
const AWS = require('aws-sdk');
import Responses from '../common/API_Responses';
import Dynamo from '../common/Dynamo';

const tableName = process.env.tableName;

export const handler: APIGatewayProxyHandler = async event => {
    // console.log('event', event);

    // get userId and cycleAttr
    let UserId = event.requestContext.authorizer.claims?.sub;
    let cycleAttr = event.requestContext.authorizer.claims['custom:CyclePosition'];

    // get info on card to update
    const cardData = JSON.parse(event.body);

    // check if nothing passed
    if (!cardData.CardID) {
        return Responses._400({message: 'not enough Information'});
    }

    // write data to dynamoDB table
    const req = await Dynamo.update(UserId, cardData.CardID, cardData.Correct, cycleAttr, tableName);

    if (!req) {
        return Responses._400({message: 'Failed to update card level'});
    }
    
    return Responses._201("Updated card level");
}
