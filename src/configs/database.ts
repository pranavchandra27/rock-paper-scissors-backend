import * as mongoDB from "mongodb";

export const collections: { users?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_URI as string
  );
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME as string);
  const usersCollection: mongoDB.Collection = db.collection(
    process.env.USERS_COLLECTION_NAME as string
  );
  collections.users = usersCollection;
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
  );
}
