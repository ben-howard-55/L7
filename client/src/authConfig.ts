import { AuthOptions } from '@aws-amplify/auth/lib-esm/types';

const authConfig: AuthOptions = {
  userPoolId: process.env.REACT_APP_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_WEB_CLIENT_ID,
  region: process.env.REACT_APP_REGION,
};

export default authConfig;
