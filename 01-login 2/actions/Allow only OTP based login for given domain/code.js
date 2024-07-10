/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  if(event.connection.strategy === 'samlp') {
    return;
  }

  console.log(event.user.app_metadata);
  if (event.stats && event.stats.logins_count < 2) {
    return
  }

  const ALLOWED_OTP_ONLY_DOMAINS = ['rivian.com','rootbridges.com','avastu.com'];
  var emailDomain = event.user.email?.split('@')[1];

  if(ALLOWED_OTP_ONLY_DOMAINS.indexOf(emailDomain) >= 0 && event.connection.strategy !== 'samlp' && event.connection.name != 'email') {
    return api.access.deny("OTP based login only allowed ");
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
