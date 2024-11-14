import { defineAuth } from "@aws-amplify/backend";
import { postConfirmation } from "./post-confirmation/resource"
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
    mode: "REQUIRED",
    sms: true,
  },
  accountRecovery: "NONE",
  groups: ["ADMINS", "APP_USERS"],
  triggers: {
    postConfirmation,
  },
  access: (allow) => [
    allow.resource(postConfirmation).to(["addUserToGroup"]),
  ],
});
