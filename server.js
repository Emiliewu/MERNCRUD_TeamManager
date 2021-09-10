const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

require('./server/config/mongoose.config');
require('./server/routes/player.route')(app);

app.listen(port, () => console.log(`You are listening at port:${port}...`));