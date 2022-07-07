const yup = require('yup');

module.exports.USER_UPDATING_VALIDATION_SCHEMA = yup.object({
  firstName: yup
    .string()
    .trim()
    .max(64),
  last_name: yup
    .string()
    .trim()
    .max(64),
  email: yup
    .string()
    .trim()
    .email(),
  tel: yup
    .string()
    .length(13)
    .matches(/^\+380\d{9}$/, 'phone must start with +380'),
});
