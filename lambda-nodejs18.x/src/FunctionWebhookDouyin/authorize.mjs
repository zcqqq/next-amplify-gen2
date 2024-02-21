import { CognitoIdentityProviderClient, CreateGroupCommand, GetGroupCommand, AdminAddUserToGroupCommand } from "@aws-sdk/client-cognito-identity-provider";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { AppSyncClient } from "@aws-sdk/client-appsync";
import https from 'https';

export default async function authorize(jsonBody) {
  
  function postRequest(body) {
    const url = 'https://mma7gba3ozbddoagm5o753vwoa.appsync-api.us-east-1.amazonaws.com/graphql';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'da2-7hhdqgedwfhsddxbbw24bulgfa'
      },
    };
    return new Promise((resolve, reject) => {
      const req = https.request(url, options, res => {
        let rawData = '';
        res.on('data', chunk => {
          rawData += chunk;
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(rawData));
          } catch (err) {
            reject(new Error(err));
          }
        });
      });
      req.on('error', err => {
        reject(new Error(err));
      });
        req.write(JSON.stringify(body));
      req.end();
    });
  }
  
  try {
    const result = await postRequest({
      query: 'mutation MyMutation {createTenant(input: {tenant_name: \"fromlambda\", quota_video_generation: 10}) { id}}',
      variables: ''
    });
  } catch (error) {
    return {
      statusCode: 400, body: error.message,
    };
  }
  /*//1. 如果租户不存在，则在cognito中创建group，表中创建tenant和channel；否则返回租户信息.
  const cognitoClient = new CognitoIdentityProviderClient();
  let userPoolId = process.env.amplifyAuth_userPoolId;
  const tenant = jsonBody.from_user_id;
  const groupParams = {
    GroupName: tenant,
    UserPoolId: userPoolId,
  };
  try {
    const response = await cognitoClient.send(new GetGroupCommand(groupParams));
    console.log(response);
  } catch (e) {
    const response = await cognitoClient.send(new CreateGroupCommand(groupParams));
    console.log(response);
  }

const config = {
  apiUrl: "https://xqpptgyamjcyrjyfcnrf7jxkh4.appsync-api.us-east-1.amazonaws.com/graphql" // Change the GraphQL Endpoint to your environment, which you can find in the Amplify Params 
}
const client = new AppSyncClient(config)
const queryTenant = async (id) => { // Example function
  try {
    const result = await client.request({
      query: gql(getTenant), // use your graphql query here
      variables: {
        input: {
          id
        }
      }
    })
    return result.getTenant;
  } catch (error) {
    console.log("Something went wrong in the querySomething function:", error)
  }
}
  try {
    return await queryTenant("a489c285-cc82-4c83-9a39-fbbcb5482410"); // You can also use the arguments / input from the event.
  } catch (error) {
    console.log("Something went wrong in the handler:", error)
  }

  //2. 如果用户不存在，则在cognito中创建user；否则返回用户信息.

  //3. 将当前user加入group
  /*const addUserParams = {
    GroupName: tenant,
    UserPoolId: userPoolId,
    Username: tenant,
  };
  try {
    await client.send(new AdminAddUserToGroupCommand(addUserParams));
  } catch (e) {
    // Handle error if needed
  }*/
};