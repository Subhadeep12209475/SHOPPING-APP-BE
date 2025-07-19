const jwt = require("jsonwebtoken");

const attachJWTToken = (res, data) => {
    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.cookie("authorization", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: true, 
        sameSite: "None", 
        httpOnly: true, 
        
    });
};




const removeJWTToken = (res) => {
    res.cookie("authorization", "", {
        maxAge: 0,
        secure: true, 
        sameSite: "None", 
        httpOnly: true, 
        
    });
};

const getUserIdFromToken = (token) => {
    try {
        if (!token) throw new Error("Token not found");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded && decoded._id) {
            return decoded._id; 
        }

        throw new Error("Invalid token payload");
    } catch (error) {
        console.error("JWT validation failed:", error.message);
        return null;
    }
};



module.exports = { attachJWTToken, removeJWTToken, getUserIdFromToken };
