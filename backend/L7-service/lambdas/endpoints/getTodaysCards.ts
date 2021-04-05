import { APIGatewayProxyHandler } from "aws-lambda";
const AWS = require('aws-sdk');
import Responses from '../common/API_Responses';
import Dynamo from '../common/Dynamo';

const tableName = process.env.tableName;

export const handler: APIGatewayProxyHandler = async event => {
    console.log('event', event);

    let UserId = event.requestContext.authorizer.claims?.sub;

    if (!UserId) {
        // user unauthorized
        return Responses._401({message: 'user unauthorized'});
    }

    // GET auth
    let auth = event.headers.Authorization;

    // GET Current Cycle Position
    const provider = new AWS.CognitoIdentityServiceProvider();

    var params = {
        AccessToken: auth,
        UserAttributes: [
            {
                Name: 'custom:CyclePosition',
                value: '1'
            }
        ]
    };

    const user = await provider.updateUserAttributes(params).promise();
  
    // GET todays cycle numbers
    
    // send a query asking for all cards that match todays requirements.
    const req = await Dynamo.queryTodays(UserId, number, tableName);

    if (!req) {
        return Responses._400({message: 'Failed to find Cards'});
    }
    
    // immutably remove properties from an array of objects
    const newArr = req.map(({UserID, ...rest}) => rest);

    return Responses._200(newArr);
}


    const user = await provider.updateUserAttributes(params).promise();
    console.log(user);

    // const cylceAttr = user.UserAttributes.find(a => a.Name === "dev:custom:CyclePosition");

    // let pos = event.request.userAttributes['custom:CyclePosition'];
    // if (!UserId) {
    //     // user unauthorized
    //     return Responses._401({message: 'user unauthorized'});
    // }

    // const cardData = JSON.parse(event.body);

    // if (!cardData.CardID) {
    //     return Responses._400({message: 'not enough Information'});
    // }

    // write data to dynamoDB table
    // const req = await Dynamo.update(UserId, cardData.CardID, cardData.Correct, tableName);

    // if (!req) {
    //     return Responses._400({message: 'Failed to update card level'});
    // }
    
    // return Responses._201("Updated card level");
    return Responses._201(JSON.stringify(user.UserAttributes));
}
