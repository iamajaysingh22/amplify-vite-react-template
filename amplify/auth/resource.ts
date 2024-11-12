import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    phone: true,
  },
  userAttributes: {
    gender: {
      mutable: true,
      required: false,
    },
    email: {
      mutable: true,
      required: true,
    },
  },
  
  multifactor: {
    mode: 'REQUIRED',
    sms: true,
  },
  groups: ["ADMINS", "APP_USERS"],
});
