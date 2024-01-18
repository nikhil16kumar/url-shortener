const allRoles = {
  user: [],
  expert: ['post', 'get'],
  learner: ['*'],
  admin: ['*'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
