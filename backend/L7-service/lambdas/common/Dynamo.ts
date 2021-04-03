const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get (UserID, CardID, TableName) {
        const params = {
            TableName,
            Key: {
                CardID,
                UserID
            }
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            return null;
        }
        console.log(data);

        return data.Item;
    }
};


export default Dynamo;