
const mongoose = require("mongoose");


// const productDetails = mongoose.Schema({
//   rowId : {type :String , required :false},
//   name : {type : String , required : false},
//   date : {type : String , required : false},
//   quantity : {type : String , required : false},
//   duration : {type : String , required : false},
//   payment : {type : String  , required : false},
//   renewed : {type : Boolean , default:false},


// })


const leadSchema = mongoose.Schema({
  // leadId: { type: String, required: true },
  // status: { type: String, required: false },
  // date: { type: String, required: true },
  // leadSource: { type: String, required: false },

  // name: { type: String, required: false },
  // mobile: { type: String, required: false },
  // email: { type: String, required: false },
  // message: { type: String, required: false },


  // productDetails: [productDetails],
  // salesExecutiveName: { type: String, required: false },
  // salesExecutiveEmail: { type: String, required: false },
  // dublicate : { type: Boolean , required: false },
  // productQty: { type: String, required: false },
  // duration: { type: String, required: false },
  // payment: { type: String, required: false },


  leadId: { type: String, required: true },
  status: { type: String, required: false },
  date: { type: String, required: true },
  name: { type: String, required: false },
  email: { type: String, required: false },
  mobile: { type: String, required: false },
  remarks: { type: String, required: false },

  salesExecutiveName: { type: String, required: false },
  salesExecutiveEmail: { type: String, required: false },
  dublicate: { type: Boolean, required: false },

  Profession: { type: String, required: false },
  panNumber: { type: String, required: false },
  City: { type: String, required: false },
  State: { type: String, required: false },
  Address: { type: String, required: false },
  DOB: { type: String, required: false },
  source: { type: String, required: false },
  PropertyType: { type: String, required: false },
});
const Lead = mongoose.model("lead", leadSchema);

module.exports = Lead;


