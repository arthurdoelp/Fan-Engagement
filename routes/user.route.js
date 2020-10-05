const express = require('express');
const router = express.Router();

//Load Controllers
const {
    registerArtistController,
    googleController,
    // activationController,
    // loginController,
    // forgotPasswordController,
    // resetPasswordController,
    // inviteCoworkersController,
    // activateCoworkerController,
    // deleteUserController
} = require('../controllers/user.controller.js')

router.post('/artist/register', registerArtistController);
router.post('/auth/google', googleController);
// router.post('/auth/activation', activationController);
// router.put('/auth/password/forgot', forgotPasswordValidator, forgotPasswordController);
// router.put('/auth/password/reset', resetPasswordValidator, resetPasswordController);
// router.post('/auth/coworkers/invite', inviteCoworkersController);
// router.post('/auth/coworkers/activate', activateCoworkerController);
// router.post('/auth/user/delete', deleteUserController);


module.exports = router;