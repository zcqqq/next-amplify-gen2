import { defineBackend } from '@aws-amplify/backend';
import { data } from './data/resource';
import { auth } from './auth/resource';

const backend = defineBackend({
  data,
  auth
});

// extract L1 CfnUserPool resources
const { cfnUserPool } = backend.auth.resources.cfnResources;
// use CDK's `addPropertyOverride` to modify properties directly
cfnUserPool.addPropertyOverride("Schema", [
  {
    Name: "user_source", //douyin等
    AttributeDataType: "String",
    Mutable: true,
  },
  {
    Name: "tenant_id", //TODO: 删除
    AttributeDataType: "String",
    Mutable: true,
  },
]);
cfnUserPool.addPropertyOverride('Policies.PasswordPolicy.RequireUppercase', false);
cfnUserPool.addPropertyOverride('Policies.PasswordPolicy.RequireNumbers', false);

