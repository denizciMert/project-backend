import { disconnect } from "mongoose";

async function disconnectDatabase() {
    try {
        await disconnect()
    } catch (error) {
        console.log(error);
        throw new Error("Could not disconnect from DB!");
    }
}

export default disconnectDatabase;