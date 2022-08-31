require('dotenv').config();
const server = require('./src/server/express');
const { sequelize } = require('./src/models');
const { precharge } = require('./src/repositories/precharge.repositories');

const port = process.env.PORT || '3001';

// Syncing all the models at once.
// sequelize.sync({ force: false }).then(() => {
//     server.listen(port, async () => {
//         console.log(`Listening on ${port}`); // eslint-disable-line no-console
//     });
// });

server.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.'); // eslint-disable-line no-console
        await sequelize.sync({ force: false });
        console.log('All models were synchronized successfully.'); // eslint-disable-line no-console
        await precharge();
    } catch (error) {
        console.error('Unable to connect to the database:', error); // eslint-disable-line no-console
    }
    console.log(`Listening on ${port}`); // eslint-disable-line no-console
});