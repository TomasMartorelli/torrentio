import express from 'express';
import { createUser, getAllUsers, getUserByName, updateUser, deleteUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.post('/login', loginUser);

router.get('/name/:name', getUserByName);
router.put('/name/:name', updateUser);
router.delete('/name/:name', deleteUser);


export default router;
