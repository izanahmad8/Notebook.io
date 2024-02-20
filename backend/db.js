import mongoose from 'mongoose';
const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database successfully");
    }
    catch (error) {
        console.log(error);
    }
}

export default connectToMongo;