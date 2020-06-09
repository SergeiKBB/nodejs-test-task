import dotenv = require('dotenv');

dotenv.config();

const dbConnectUrl = 'mongodb+srv://test:test12345@nodejstest-eqwlg.gcp.mongodb.net/dbTest?retryWrites=true&w=majority'

export default {
    port: process.env.PORT || '3000',
    dbUserName: process.env.DB_USER_NAME || 'test',
    dbUserPassword: process.env.DB_USER_PASSWORD || 'test12345',
    dbName: process.env.DB_NAME || 'dbTest',
    dbConnectUrl: process.env.DB_CONNECT_URL || dbConnectUrl
}

