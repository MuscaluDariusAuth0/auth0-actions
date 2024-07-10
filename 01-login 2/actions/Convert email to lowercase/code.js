/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/




exports.onExecutePostLogin = async (event, api) => {
  const ManagementClient = require('auth0').ManagementClient;
  const management = new ManagementClient({
    domain: event.secrets['AUTH0_DOMAIN'],
    clientId: event.secrets['AUTH0_CLIENT_ID'],
    clientSecret: event.secrets['AUTH0_CLIENT_SECRET']
  });

  // Convert email to lowercase if user has email.
  if (event.user.email != null) {
    const data = { email: event.user.email.toLowerCase() };
    const params = { id: event.user.user_id };

    try {
      await management.users.update(params, data)
    } catch (e) {
      // Use the Realtime Webtask Auth0 Extension to check logs.
      console.log(`Error, email was not updated: ${e}`);
    }
  }
};


/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
// exports.onContinuePostLogin = async (event, api) => {
// };
