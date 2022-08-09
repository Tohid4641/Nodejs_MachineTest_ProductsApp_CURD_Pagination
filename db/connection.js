const mongoose = require('mongoose');

const MONGO_ATLAS = process.env.MONGO_ATLAS;

mongoose.connect(MONGO_ATLAS).then(() => {
    console.log(`connnection successful`);
}).catch((err) => console.log(`no connection :-->\n`,err));

