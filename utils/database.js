const mongoose = require('mongoose');

const connectedDb = async(req,res)=>{

     try{
        const Db = await mongoose.connect(process.env.MONGO_URL);
        console.log('Db is connected successfully');
        return Db
     }
     catch(err){
          console.log(Error.err);
          console.log('unable to connected Db')
     }

}

module.exports = connectedDb;