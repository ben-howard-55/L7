import { APIGatewayProxyHandler } from "aws-lambda";
import Responses from '../common/API_Responses';
import Dynamo from '../common/Dynamo';
import chart from '../common/chart';

const tableName = process.env.tableName;

export const handler: APIGatewayProxyHandler = async event => {
    console.log('event', event);

    let UserId = event.requestContext.authorizer.claims?.sub;

    if (!UserId) {
        // user unauthorized
        return Responses._401({message: 'user unauthorized'});
    }

    // GET Current Cycle Position
    let number = event.requestContext.authorizer.claims['custom:CyclePosition'];
  
    // GET todays cycle numbers
    let todaysLevels = chart[number];
    console.log(todaysLevels);
    
    // send a query asking for all cards that match todays requirements.
    const req = await Dynamo.queryTodays(UserId, number, todaysLevels, tableName);

    if (!req) {
        return Responses._400({message: 'Failed to find Cards'});
    }
    
    // immutably remove properties from an array of objects
    const newArr = req.map(({UserID, ...rest}) => rest);

    return Responses._200(newArr);
}