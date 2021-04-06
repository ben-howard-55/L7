import { APIGatewayProxyHandler } from "aws-lambda";
const AWS = require('aws-sdk');
import Responses from '../common/API_Responses';
import chart from '../common/chart';

export const handler: APIGatewayProxyHandler = async event => {
    console.log('event', event);

    let UserId = event.requestContext.authorizer.claims?.sub;

    if (!UserId) {
        // user unauthorized
        return Responses._401({message: 'user unauthorized'});
    }

    // fetch date and cycle pos from cognito
    const currentCycle = event.requestContext.authorizer.claims['custom:CyclePosition'];
    const lastDay = event.requestContext.authorizer.claims['custom:DayLastUpdated'];

    // get user passed day
    if (!event.pathParameters || !event.pathParameters.Day) {
        // failed without an ID
        return Responses._400({message: 'missing ID from path'});
    }
    let newDay = event.pathParameters.Day;

    // return 400 if days are equal
    if (newDay == lastDay) {
        return Responses._200(newDay);
    } 

    let newCrc = (currentCycle + 1) % chart.length;
    
    // update cognito custom attr
    const provider = new AWS.CognitoIdentityServiceProvider();

    const res = await provider.updateUserAttributes({
        AccessToken: event.headers.Authorization,
        UserAttributes: [
          {
            Name: "custom:CyclePosition",
            Value: newCrc
          },
          {
            Name: "custom:DayLastUpdated",
            Value: newDay
          }
        ]
      }).promise();

    console.log('res', res);

    return Responses._200(newCrc);
}