const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/players', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false
})
  .then(() => console.log('Established a connection to the database'))
  .catch(err => console.log('something went wrong when connecting to the database', err));
  
mongoose.connection.on('error', (err) => console.err(err));