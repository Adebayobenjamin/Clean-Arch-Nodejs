module.exports.User = class User {
  constructor({ id, firstname, lastname, email, gender, meta = {} }) {
    this.id = id;
    this.firstname = firstname;
    (this.lastname = lastname),
      (this.email = email),
      (this.gender = gender),
      (this.meta = meta);
  }
};

const genders = {
  NOT_SPECIFIED: 0,
  MALE: 1,
  FEMALE: 2,
};

module.exports.userConstants = {
  genders,
};
