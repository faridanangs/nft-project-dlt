const mongoose = require('mongoose');
const next = require('next');
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV != 'production';
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

dotenv.config({ path: "./config.env" });
const app = require('./app');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => console.log("DB connection successfully"))

const port = 3000;
let server;

nextServer.prepare().then(() => {
    app.get("*", (req, res) => {
        return handle(req, res)
    })

    app.listen(port, () => {
        console.log(`App running on port ${port}...`)
    })
})


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const next = require('next');
// const dotenv = require('dotenv');

// const dev = process.env.NODE_ENV != 'production';
// const nextServer = next({ dev });
// const handle = nextServer.getRequestHandler();

// dotenv.config({ path: "./config.env" });
// const app = require('./app');

// const port = 3000;
// let server;

// const uri = "mongodb+srv://f4r1danangs:FQ8e6IVQ9Vs3DvlK@cluster0.exfo8rb.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// nextServer.prepare().then(() => {
//     app.get("*", (req, res) => {
//         return handle(req, res)
//     })

//     app.listen(port, () => {
//         console.log(`App running on port ${port}...`)
//     })
// })