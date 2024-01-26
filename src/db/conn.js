

const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017");
const userSchema = new mongoose.Schema(
    {
        username :{type : String,
                  required : true,
                  unique : true  }, 

        email : { 
            type : String ,
            required : true ,
            unique : true 
        },
        password : {
            type: String ,
            required : true
        },
        confirmpassword  :    
        { 
            type : String ,
            required : true 
        }
    }
);