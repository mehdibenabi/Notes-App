const jwt = require("jsonwebtoken")

const authentificateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];


    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });

}

module.exports={authentificateToken};