const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dyanmo = {
    async get (CardID, TableName) {
        const params = {
            TableName,
            Key: {
                CardID
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