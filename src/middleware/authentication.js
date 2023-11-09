/**
 * Authentication middleware
 * 
 * @todo authenticate the request using http headers
 * @todo set reasonable user controls (admin, user, etc)
 * @todo set user in request context
 */
export default (req, res, next) => {
  // if (!req.headers.authorization) {
  //   return res.status(403).json({ error: 'No credentials sent!' });
  // }
  next();
};
