'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: {
    type: String,
    Required: 'Kindly enter the title of the note'
  },
  text: {
    type: String,
    Required: 'Kindly enter the text of the note'
  },
  color: {
    type: String,
    default: 'white',
    enum: ['blue', 'yellow', 'red', 'purple', 'white', 'green']
  },
  long: {
    type: Boolean
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  }
});


module.exports = mongoose.model('Notes', NoteSchema);