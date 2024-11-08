const admimnMiddleware = async (req, res, next) => {
    const user = req.user 

    if (user && user.role === "ADMIN") {
        return next()
    } else {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = admimnMiddleware