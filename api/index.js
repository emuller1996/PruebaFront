const server = require('./src/app.js');
const {
    PORT
} = process.env;

// Syncing all the models at once.

server.listen(PORT, () => {
    console.log('%s listening at ' +PORT); // eslint-disable-line no-console
});
