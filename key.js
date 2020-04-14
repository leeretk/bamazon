console.log('this is loaded');

exports.sql_db = {
  id: process.env.USERSECRET,
  secret: process.env.PWSECRET
};
