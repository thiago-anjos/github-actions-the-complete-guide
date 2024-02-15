import { MongoClient } from "mongodb";

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    console.log("Trying to connect to db");
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log("Connected successfully to server");
  } catch (error) {
    console.log("Connection failed:", error.message);
    throw error; // Re-throw the error to handle it where connectToDatabase() is called.
  }
}

// Call the function to connect to the database
connectToDatabase()
  .then(() => {
    console.log("Database connection established.");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit the process with an error code
  });

const database = client.db(dbName);

export default database;
