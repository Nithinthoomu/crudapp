module.exports = (req, res, next) => {
    const { userId } = req.body;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    next();
  };
  