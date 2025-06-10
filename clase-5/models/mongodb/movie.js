import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

// const uri_local = 'mongodb://localhost:27017';
const uri = 'mongodb+srv://lmar11xd:Mongo2025@cluster0.hm7a2vd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    const database = client.db('db_nodejs');
    return database.collection('movies');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    await client.close();
  }
}

export class MovieModel {
  static async getAll ({ genre }) {
    const collection = await connect();

    if (genre) {
      return collection.find({
        genre: {
          $elementMatch: {
            $regex: genre,
            $options: 'i' // Case-insensitive search
          }
        }
      }).toArray();
    }
    
    return collection.find().toArray();
  }

  static async getById ({ id }) {
    const collection = await connect();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  static async create ({ movie }) {
    const collection = await connect();
    const { insertedId } = await collection.insertOne(movie);
    return {
      id: insertedId,
      ...movie
    };
  }

  static async update ({ id, movie }) {
    const collection = await connect();

    const { ok, value } = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: movie },
      { returnDocument: 'after' }
    );

    if (!ok) {
      throw new Error('Movie not found');
    }

    return {
      id: value._id,
      ...value
    };
  }

  static async delete ({ id }) {
    const collection = await connect();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}