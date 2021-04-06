import { APIGatewayProxyHandler } from "aws-lambda";
import Responses from '../common/API_Responses';
import chart from '../common/chart';

export const handler: APIGatewayProxyHandler = async event => {
    console.log('event', event);

    let UserId = event.requestContext.authorizer.claims?.sub;
  
    if (!UserId) {
        // user unauthorized
        return Responses._401({message: 'user unauthorized'});
    }

    const currentCycle = event.requestContext.authorizer.claims['custom:CyclePosition'];

    var cyc = parseInt(currentCycle);

    if (!currentCycle) {
        // can't find current cycle pos
        return Responses._400({message: 'couldn\'t get cycle position'});
    }

    return Responses._200({Chart: chart, CurrentCyclePos: cyc});
}