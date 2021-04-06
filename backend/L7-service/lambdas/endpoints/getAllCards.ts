import { APIGatewayProxyHandler } from "aws-lambda";
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

    const req = await Dynamo.query(UserId, tableName);

    if (!req) {
        return Responses._400({message: 'Failed to find Cards'});
    }
    
    // immutably remove properties from an array of objects
    const newArr = req.map(({UserID, ...rest}) => rest);

    return Responses._200(newArr);
}
