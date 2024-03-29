import mongoose from 'mongoose';

const Connection = async (url) => {
    const URL=url;
     try{

      await mongoose.connect(URL,{useNewUrlParser:true});
      console.log('DB connected');
     }catch (error){
       console.log('Error while connecting DB',error);
     }

}
export default Connection;