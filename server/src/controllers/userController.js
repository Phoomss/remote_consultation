const InternalServer = require("../exceptions/internal-server");

exports.userInfo = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        res.status(200).json({ message: "User info retrieved successfully", data: req.user });
    } catch (error) {
        InternalServer(res, error)
    }
};

exports.editProfile = async(req,res)=>{
    try {
        
    } catch (error) {
        InternalServer(res,error)
    }
}