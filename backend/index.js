const connectToDB = require("./database");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
// const listingModel = require("./schema/listing.model");

// const data =require('./data')
// console.log(data)
connectToDB();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello user from Express");
});

// app.get('/api/self/addListing', async(req,res)=>{
//   await listingModel.deleteMany({})
//   const response = await listingModel.insertMany(data.data)
//   res.send("add list")
// })

app.use('/api/v3.2/auth', require('./router/auth.routes'))
app.use('/api/v3.2/post', require('./router/listing.routes'))
app.use('/api/v3.2/rating', require('./router/rating.routes'))
app.use('/api/v3.2/comment', require('./router/comment.routes'))
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
