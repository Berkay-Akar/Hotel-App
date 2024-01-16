const mongoose = require("mongoose");

const connectWithDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(
      "mongodb+srv://berkayakar:berkaiakar@berkai.j0hrfw9.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(console.log(`DB connected successfully`))
    .catch((err) => {
      console.log(`DB connection failed`);
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectWithDB;
