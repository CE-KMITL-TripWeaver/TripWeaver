import mongoose from 'mongoose'

export const connectMongoDB = async () => {

    const mongoURI = process.env.MONGDB_URI as string;

    try {
        await mongoose.connect(mongoURI);

        console.log("Connected to mongoDB")

    } catch(err) {
        console.log("Error ",err)
    }
}