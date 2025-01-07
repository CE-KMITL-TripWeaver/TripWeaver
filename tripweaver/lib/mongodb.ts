import mongoose from 'mongoose';


export const connectMongoDB = async () => {
    const mongoURI = process.env.MONGDB_URI as string;


    if (mongoose.connection.readyState === 1) {
        return;
    }

    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw new Error("Failed to connect to MongoDB");
    }
};