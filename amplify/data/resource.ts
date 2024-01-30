import { type ClientSchema, a, defineData, defineFunction } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rules below
specify that owners, authenticated via your Auth resource can "create",
"read", "update", and "delete" their own records. Public users,
authenticated via an API key, can only "read" records.
=========================================================================*/
const schema = a.schema({
  //core
  Tenant: a.model({
    tenant_name: a.string(),
    quota_video_generation: a.integer(),
    left_video_generation: a.integer(),
  }),
  Channel: a.model({
    tenant_id: a.string(),
    channel_id: a.string(), //来自渠道的原始id
    channel_name: a.string(),
    channel_type: a.string(),
    channel_status: a.string(),
    contents: a.hasMany('Content'),
    strategies: a.hasMany('Strategy'),
    groups: a.hasMany('Group'),
    events: a.hasMany('Event'),
    tenant: a.belongsTo('Tenant'),
  }).authorization([a.allow.groupDefinedIn('tenant_id')]),
  /*
  Content: a.model({
    content_type: a.string(),
    content_content: a.string(), //TODO 先模拟content的文本内容
  }),
  Strategy: a.model({
    strategy_name: a.string(),
    strategy_type: a.string(),
    strategy_match_type: a.string(), //AI or regex
    strategy_match_content: a.string(),
    strategy_content: a.string(),
  }),
  Audience: a.model({
    audience_name: a.string(),
    audience_type: a.string(),
  }),
  Customer: a.model({
    name: a.string(),
    gender: a.string(),
    //自定义字段
    field1: a.string(),
    field2: a.string(),
    //标签

    events: a.hasMany('Event'),
  }),
  Group: a.model({
    group_name: a.string(),
    group_type: a.string(),
  }),
  Tag: a.model({
    tag_name: a.string(),
    tag_type: a.string(),
    parent_folder_id: a.id(),
  }),
  TagFolder: a.model({
    folder_name: a.string(),
    parent_folder_id: a.id(),
  }),
  Event: a.model({
    event_type: a.string(),
    event_timestamp: a.integer(),
  }),
  //meta
  MetaCustomerField: a.model({
    field_id: a.string(),
    field_name: a.string(),
    field_type: a.string(),
  }),*/
}).authorization([a.allow.public()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
