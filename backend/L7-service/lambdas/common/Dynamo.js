const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dyanmo = {
    async get (userId, cardId, TableName) {
        const params = {
            TableName,
            Key: {
                userId,
                cardId
            }
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for CardID of ${CardID} from ${TableName}`);
        }
        console.log(data);

        return data.Item;
    }
};

module.exports = Dyanmo;