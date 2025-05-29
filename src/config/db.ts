
import mongoose, { connect } from "mongoose";
import colors from "colors";

export const connectDB = async () => {
    try {
        console.log(colors.cyan.bold(`Connecting to MongoDB... ${process.env.MONGO_URI}`));
        const connection = await mongoose.connect(process.env.MONGO_URI as string);
        const urlConnection = `${connection.connection.host}:${connection.connection.port}`;
        console.log("MongoDB connected successfully", urlConnection);
    }
    catch (error) {
        console.error(colors.red.bold(`MongoDB connection failed: ${error}`));
        process.exit(1); // Exit the process with failure
    }
};