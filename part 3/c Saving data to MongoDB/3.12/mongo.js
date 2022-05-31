const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password> [name] [number]"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@fullstackcluster.lqogz.mongodb.net/?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  numero: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 5) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected')

      return Person.find({});
    })
    .then((result) => {
      result.forEach(person => {
        console.log(person);
      });
      mongoose.connection.close();
    })
    .catch((err) => console.log(err))
} else {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected')

      const person = new Person({
        name: process.argv[3],
        numero: process.argv[4],
      });

      return person.save();
    })
    .then(() => {
      console.log("person saved!");
      mongoose.connection.close();
    })
    .catch((err) => console.log(err))
}
