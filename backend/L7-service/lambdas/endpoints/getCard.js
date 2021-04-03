const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({message: 'missing ID from path'});
    }

    let CardID = event.pathParameters.ID;

    const req = await Dynamo.get(CardID, tableName).catch(err => {
        console.log("error in Dynamo Get", err);
        return null;
    });

    if (!req) {
        return Responses._400({message: 'Failed to get Card by CardID'});
    }

    return Responses._200({req});
}