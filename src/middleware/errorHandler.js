/**
 * Error handler middleware - generic catch-all for errors for errors that aren't already specifically handled
 * @todo this should be expanded to handle different types of errors
 */
export default (error, req, res, next) => {
  return res.status(500).json({ error: error.toString() });
};
