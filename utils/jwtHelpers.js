const jwt = require("jsonwebtoken");

const attachJWTToken = (res, data) => {
    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.cookie("authorization", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: true, // only sent over https connections
        sameSite: "None", // only our backend will get this cookie (no other backend can access it)
        httpOnly: true, // frontend will not be able to read this cookie
        // so that our token is out of reach of javascript --> hackers
    });
};




const removeJWTToken = (res) => {
    res.cookie("authorization", "", {
        maxAge: 0,
        secure: true, // only sent over https connections
        sameSite: "None", // only our backend will get this cookie (no other backend can access it)
        httpOnly: true, // frontend will not be able to read this cookie
        // so that our token is out of reach of javascript --> hackers
    });
};

const getUserIdFromToken = (token) => {
    try {
        if (!token) throw new Error("Token not found");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded && decoded._id) {
            return decoded._id; // Assuming your token payload has {_id: userId}
        }

        throw new Error("Invalid token payload");
    } catch (error) {
        console.error("JWT validation failed:", error.message);
        return null;
    }
};



module.exports = { attachJWTToken, removeJWTToken, getUserIdFromToken };
