const logger = function(req,res,next){
    console.log(`Received ${req.method} request -> ${req.headers.host}${req.url}`);
    next();
}

const authenticateRequest = function(req,res,next){
    console.log(`verified user`);
    next();
}

module.exports = { logger, authenticateRequest };