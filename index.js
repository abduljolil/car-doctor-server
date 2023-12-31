const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port =process.env.PORT || 5000 ;

// middleware
app.use(cors());
app.use(express.json());

 

const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.j0ovfoc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
  
    const servicesCollection = client.db('carDoctor').collection('services');
    const checkOutCollection =client.db('carDoctor').collection('checkOut');
     app.get('/services',async(req,res)=>{
      const result = await servicesCollection.find().toArray();
      res.send(result);
     })

     app.get('/services/:id',async(req,res)=>{
      const id=req.params.id;
      const query = {_id : new ObjectId(id)}
       
      const result = await servicesCollection.findOne(query)
      res.send(result);
     })
     app.post('/checkOut',async(req,res)=>{
      const user = req.body;J
      const result = await checkOutCollection.insertOne(user);
      res.send(result);
     })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('doctor is running')
})

app.listen((port),()=>{
    console.log(`doctor server is running ${port}`)
})