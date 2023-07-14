const {register, login, setAvatar, getAllUsers, getUserProfile, updateUserProfile} = require('../controllers/userController');
const router = require('express').Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);
router.get("/userProfile/:id", getUserProfile);
router.post("/updateProfile/:id", updateUserProfile);

module.exports = router;