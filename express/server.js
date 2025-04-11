const express = require('express');
const cors = require('cors'); 
const connectDb = require('./config/dbConnections');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const port = 7000;


connectDb();

app.use(cors()); 

app.use(express.json());

app.use('/api/recipes', require('./routes/recipeRouter'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
