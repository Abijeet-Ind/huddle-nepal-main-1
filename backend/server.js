const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); // dotenv packaged required and initiliazed on the go
const app = require("./app");
const mongoose = require("mongoose");

//MongoDb connection
const dbConnectionEstd = process.env.MONGO_ID.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
);

mongoose
  .connect(dbConnectionEstd)
  .then(() => {
    console.log("Database connected sucesfully !");
  })
  .catch((err) => {
    console.log(err.message);
  });

// connectMongoDB(process.env.MONGODB_URI);

//Listening on PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at port , ${PORT}`);
});
