const Responses = require('./API_Responses');

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({message: 'missing ID from path'});
    }

    let ID = event.pathParameters.ID;

    if (data[ID]) {
        // return data
        return Responses._200(data[ID]);
    }

    // failed as ID not in the data
    return Responses._400({message: 'ID not found in data'});

}

const data = {
    1234: {front: 'Hunde', back: 'Dog', level: 1}
}