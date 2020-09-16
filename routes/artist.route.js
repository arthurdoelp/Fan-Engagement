const express = require('express');
const router = express.Router();

//Load Controllers
const {
    // registerController,
    // activationController,
    // loginController,
    // forgotPasswordController,
    // resetPasswordController,
    // inviteCoworkersController,
    // activateCoworkerController,
    // deleteUserController
} = require('../controllers/artist.controller.js')

// router.post('/auth/register', validRegister, registerController);
// router.post('/auth/login', validLogin, loginController);
// router.post('/auth/activation', activationController);
// router.put('/auth/password/forgot', forgotPasswordValidator, forgotPasswordController);
// router.put('/auth/password/reset', resetPasswordValidator, resetPasswordController);
// router.post('/auth/coworkers/invite', inviteCoworkersController);
// router.post('/auth/coworkers/activate', activateCoworkerController);
// router.post('/auth/user/delete', deleteUserController);


module.exports = router;