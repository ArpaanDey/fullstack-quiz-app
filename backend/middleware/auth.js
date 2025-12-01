// // import jwt from 'jsonwebtoken';
// // import User from '../models/userModel.js';

// // const JWT_SECRET = 'your_jwt_secret_here';

// // export default async function authMiddleware(req,res,next){
// //     const authHeader= req.headers.authorization;

// //     if(!authHeader || !authHeader.startsWith("Bearer")){
// //         return res.status(401).json({
// //             success:false,
// //             message:"not authorized, token missing",
// //         });

// //     }

// //     const token= authHeader.split('')[1];

// //     try {
// //         const payload= jwt.verify(token.JWT_SECRET);
// //         const user= await User.findById(payload.id).select('-password');

// //         if(!user){
// //             return res.status(401).json({
// //                 success:false,
// //                 message:"user not found",
// //             });
// //         }
// //         req.user= user;
// //         next()
// //     } catch (err) {
// //         console.error('jwt varification faield',err);
// //         return res.status(401).json({
// //             success:false,
// //             message:"token invalid or expired",
// //         });
// //     }
// // } 

// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// const JWT_SECRET = "your_jwt_secret_here";

// export default async function authMiddleware(req, res, next) {
//   const authHeader = req.headers.authorization;

//   // No token
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       success: false,
//       message: "Not authorized, token missing",
//     });
//   }

//   // Extract token
//   const token = authHeader.split(" ")[1];

//   try {
//     // Verify token
//     const payload = jwt.verify(token, JWT_SECRET);

//     // Find user by decoded ID
//     const user = await User.findById(payload.id).select("-password");

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err.message);
//     return res.status(401).json({
//       success: false,
//       message: "Token invalid or expired",
//     });
//   }
// }
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = 'your_jwt_secret_here';

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "not authorized, token missing",
    });
  }

  // Correct token extraction
  const token = authHeader.split(" ")[1];

  try {
    // Correct verify syntax
    const payload = jwt.verify(token, JWT_SECRET);

    // Find user
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({
      success: false,
      message: "token invalid or expired",
    });
  }
}
