import mongoose from 'mongoose'

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGDB_URI);

        console.log("Connected to mongoDB")

    } catch(err) {
        console.log("Error ",err)
    }
}