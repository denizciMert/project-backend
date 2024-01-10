import { connect } from "mongoose";

async function connectDatabase() {
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error);
        throw new Error("Could not connect to DB!");
    }
}

export default connectDatabase;