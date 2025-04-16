const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be at least 3 characters long'],
        },
        lastname:{
            type:String,
            minlength:[3,'Last name must be at least 3 characters long'],
        }

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be at least 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate number must be at least 3 characters long'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be at least 1'],
        },
        vehicleType:{
            type:String,
            enum:['car','bike','auto'],
            required:true,
        },
    },
    location:{
        lat:{
            type:Number,
            },
        longitude:{
            type:Number,
            },
        }
    }
);
captainSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'1d'});//this will sign the token against the secret key and will expire in 1 day
    return token;
}
captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);//this will compare the password entered by the user with the password stored in the database
}
captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);//this will hash the password using bcrypt
}
const captainModel=mongoose.model('captain',captainSchema);//this will create the model for the captain
module.exports=captainModel;