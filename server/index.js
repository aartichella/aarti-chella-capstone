const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

app.use("/users", userRoutes); 
app.use('/volunteers', volunteerRoutes)

app.listen(PORT, () => {
    console.log(`Express server listening on ${PORT}`);
});