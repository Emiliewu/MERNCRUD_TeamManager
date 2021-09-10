const mongoose = require('mongoose');

//if likes receives not number value, it will prompt a cast error from mongoose
// the following function is used to check if the received value is not a number, then change it to -1
// const num = mongoose.Number.Number.cast();
// mongoose.Number.cast((value) => {
//   if(isNaN(value)){
//     return -1;
//   }
//   return num(value);
  
// })

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Name must be at least 2 characters in length!'], 
    require: [true, 'Name is required!']
  },
  position: {
    type: String,
    default: "to be confirmed"
  },
  likes: {
    type: Number,
    min: [0, 'The minimum of likes is reached'],
    default: 0
  },
  game: {
    type: [Number],
    default: [0, 0, 0]
  }
}, {timestamps: true});

module.exports = mongoose.model('Player', PlayerSchema);