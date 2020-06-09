import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './src/api';
import config from './config';

mongoose.connect(config.dbConnectUrl, { useNewUrlParser: true });
const db = mongoose.connection;

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.on('error', err => {
    console.log('Error in ***app*** level');
    console.log(err);
});

db.on('error', error => console.error(error));
db.once('open', () => {
    app.listen(3000, () => console.log('App is listening on port 3000!'));
});

process.on('uncaughtException', err => {
    console.log('***uncaughtException***');
    console.log(err);
});
process.on('unhandledRejection', err => {
    console.log('***unhandledRejection***');
    console.log(err);
});
