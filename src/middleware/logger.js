/** custom middleware to log the time, user, route, and request body of all requests */
export default (req, res, next) => {
    console.log("Request received at " + new Date());
    console.log("User: " + req.user);
    console.log("Route: " + req.originalUrl);
    console.log("Request body: " + JSON.stringify(req.body));
    console.log();
    next();
}