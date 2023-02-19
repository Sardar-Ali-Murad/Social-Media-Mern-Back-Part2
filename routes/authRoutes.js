import express from 'express';
const router = express.Router();
import auth from "../middleware/auth.js"

import {
  register,
  login,
  updateUser,
  getCurrentUser,
  getAllUsers,
  getSingleUser
} from '../controllers/authController.js';


router.route('/register').post( register);
router.route('/login').post(login);
router.route('/updateUser').patch(auth,updateUser);
router.route('/getCurrentUser').get(auth,getCurrentUser);
router.route('/getAllUsers').get(auth,getAllUsers);
router.route('/getSingleUser/:id').get(auth,getSingleUser);

export default router;
