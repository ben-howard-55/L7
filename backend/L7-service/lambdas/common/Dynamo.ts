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
    },

    async write (UserID, CardID, data, TableName) {
        const params = {
            TableName,
            Item: {
                UserID: UserID,
                CardID: CardID,
                FrontText: data.FrontText,
                BackText: data.BackText,
                Level: 1,
                CycleLastSeen: 0
            }
        }
        
        const res = await documentClient.put(params).promise();

        if (!res) {
            return null;
        }
        console.log(res);

        return params.Item;
    }
};


export default Dynamo;