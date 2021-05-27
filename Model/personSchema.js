const mongoose = require('mongoose')
const Schema=mongoose.Schema

const personSchema = new Schema({
name:{type:String, required:true},
age:{type:Number},
favoriteFoods:[String],
});

module.exports=mongoose.model("person",personSchema)