import jwt from "jsonwebtoken";
// Define a middleware function to verify the token
const verifyToken = (req: any, res: any, next: any) => {
  if (!req.header("Authorization")) {
    res.status(401).json({ msg: "No token" });
  }
  // Get the token from the header
  const token = req.header("Authorization").split(" ")[1];
  // Verify the token using jwt
  jwt.verify(token, "secret", (err: any, decoded: any) => {
    if (err) {
      // If the token is invalid, send an error response
      res.status(401).json({ msg: "Invalid token" });
    } else {
      // If the token is valid, store the decoded payload in the request object and call the next middleware function
      req.user = decoded;
      next();
    }
  });
};

export default verifyToken;
