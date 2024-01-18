const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
const serverConfig = require('../config/serverConfig.json');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  console.log('user', user);
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, serverConfig.AuthMessage.UNAUTHORIZED));
  }

  if(user.user_status != serverConfig.userStatus.Active){
    return reject(new ApiError(httpStatus.UNAUTHORIZED, serverConfig.AuthMessage.AccIsNotActive));
  }

  req.user = user;

  if (requiredRights.length) {
    // console.log('ussssssss ', roleRights.get('learner'));
    const userRights = roleRights.get(user.userRole);
    // console.log('user rights ', userRights);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, serverConfig.AuthMessage.Forbidden));
    }
  }

  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
  console.log('auth', requiredRights);
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;

// const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
//   console.log('user', req.user);
//   if (err || info || !user) {
//     return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
//   }
//   req.user = user;

//   if (requiredRights.length) {
//     const userRights = roleRights.get(user.role);
//     const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
//     if (!hasRequiredRights && req.params.userId !== user.id) {
//       return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
//     }
//   }

//   resolve();
// };

// const auth = (...requiredRights) => async (req, res, next) => {
//   console.log('auth', req.body);
//   return new Promise((resolve, reject) => {
//     passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
//   })
//     .then(() => next())
//     .catch((err) => next(err));
// };

// module.exports = auth;





