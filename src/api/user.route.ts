import {Router} from 'express';
import UserService from "../services/user.service";

const userRouter = Router();

userRouter
    .get('/', async (req, res) => {
        try {
            const users = await UserService.getUsers();
            res.status(200).send(users);
        } catch (e) {
            console.log(e);
            res.status(500).send('Internal server error');
        }
    })
    .get('/generate', async (req, res) => {
        try {
            const users = await UserService.generateUsers();
            res.status(201).json(users);
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal server error');
        }
    })
    .put('/:userId', async (req, res) => {
        const data = req.body;
        const {userId} = req.params;
        try {
            const result = await UserService.updateUserById(userId, data);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(500).send('Internal server error');
        }
    })
    .delete('/:userId', async (req, res) => {
        const { userId } = req.params;
        try {
            const result = await UserService.deleteUserById(userId);
            if (!result) res.send('Can\'t delete user')
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(500).send('Internal server error');
        }
    })
    .post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            const isCorrect = await UserService.login(email, password);
            if (isCorrect) res.sendStatus(200);
            res.sendStatus(401);
        } catch (e) {
            console.log(e);
            res.status(500).send('Internal server error');
        }
    })

export default userRouter;
