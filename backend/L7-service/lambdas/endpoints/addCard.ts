import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidv4 } from 'uuid';
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

    // get random id
    let CardId = uuidv4();

    const cardData = JSON.parse(event.body);

    if (!cardData.FrontText || !cardData.BackText) {
        return Responses._400({message: 'no Front or Back Text'});
    }

    // write data to dynamoDB table
    const req = await Dynamo.write(UserId, CardId, cardData, tableName);

    if (!req) {
        return Responses._400({message: 'Failed to write new Card'});
    }

    // remove UserID
    delete req.UserID;

    return Responses._201(req);
}
