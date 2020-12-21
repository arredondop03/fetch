const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

const itemsRouter = require('./routes/items');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(itemsRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
