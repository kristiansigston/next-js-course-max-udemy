import { MongoClient } from "mongodb";

const connectDatabase = async () => {
  console.log("xxxx", process.env);
  const client = await MongoClient.connect(
    `mongodb+srv://kristian:${process.env.DB_PASSWORD}@cluster0.flstk.mongodb.net/events?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  );
  return client;
};

const insertDocument = async (client, collection, document) => {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
};

const getAllDocuments = async (client, collection, sort) => {
  const db = client.db();
  const result = await db
    .collection(collection)
    .find()
    .sort({ _id: sort })
    .toArray();
  return result;
};

const dbUtils = {
  connectDatabase,
  insertDocument,
  getAllDocuments,
};

export default dbUtils;
