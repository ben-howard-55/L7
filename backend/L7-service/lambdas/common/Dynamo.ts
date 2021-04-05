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
    },

    async query (UserID, TableName) {
        const params = {
            ExpressionAttributeValues: {
              ":u": `${UserID}`,
            },
            KeyConditionExpression: "UserID = :u",
            TableName: TableName,
          }

        const res = await documentClient.query(params).promise();

        if (!res) {
            return null;
        }
        console.log(res);

        return res.Items;
    },

    async queryTodays (UserID, number, TableName) {
        const params = {
            ExpressionAttributeValues: {
              ":u": `${UserID}`,
            },
            KeyConditionExpression: "UserID = :u",
            TableName: TableName,
          }

        const res = await documentClient.query(params).promise();

        if (!res) {
            return null;
        }
        console.log(res);

        return res.Items;
    },

    async delete (UserID, CardID, TableName) {
        const params = {
            TableName,
            Key: {
                CardID,
                UserID
            },
            ReturnValues: 'ALL_OLD'
          }

        const res = await documentClient.delete(params).promise();

        // if no item to delete, return null
        if (!res.Attributes) {
            return null;
        }
        console.log(res);

        return true;
    },

    async update (UserID, CardID, Correct, cycleNum, TableName) {
        let params;
        
        if (Correct) {
            params = {
                TableName,
                Key: {
                    CardID,
                    UserID
                },
                UpdateExpression: "set #L = #L + :val, CycleLastSeen = :cNum",
                ExpressionAttributeValues:{
                    ":val": 1,
                    ":cNum": cycleNum
                },
                ExpressionAttributeNames:{
                    "#L": "Level"
                },
                ReturnValues: 'UPDATED_NEW'
              }
        } else {
            params = {
                TableName,
                Key: {
                    CardID,
                    UserID
                },
                UpdateExpression: "set #L = :val",
                ExpressionAttributeValues:{
                    ":val": 1
                },
                ExpressionAttributeNames:{
                    "#L": "Level"
                },
                ReturnValues: 'UPDATED_NEW'
              }
        }  

        const res = await documentClient.update(params).promise();

        // if no item to delete, return null
        if (!res.Attributes) {
            return null;
        }
        console.log(res);

        return true;
    }
};


export default Dynamo;