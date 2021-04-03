const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    let userId = event.requestContext.authorizer.claims?.sub;
  
    if (!userId) {
        // user unauthorized
        return Responses._401({message: 'user unauthorized'});
    }

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({message: 'missing ID from path'});
    }

    let cardId = event.pathParameters.ID;

    const req = await Dynamo.get(userId, cardId, tableName).catch(err => {
        console.log("error in Dynamo Get", err);
        return null;
    });

    if (!req) {
        return Responses._400({message: 'Failed to get Card by CardID'});
    }

    return Responses._200({req});
}