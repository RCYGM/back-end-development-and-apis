// Instala y configura Mongoose
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection error:", err));

// Crea un modelo
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
});

let Person = mongoose.model("Person", personSchema);

// Crea y guarda un registro de un modelo
const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "Jorge",
    age: 25,
    favoriteFoods: ["Pizza", "Carne"],
  });

  newPerson.save((err, data) => {
    if (err) {
      console.log("Error in createAndSavePerson: ", err.message);
      done(err);
    } else {
      done(null, data);
    }
  });
};

// Crea muchos registros con model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.log("Error in createManyPeople: ", err.message);
      done(err);
    } else {
      done(null, data);
    }
  });
};

// Usa model.find() para buscar en tu base de datos
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      console.log("Error in findPeopleByName: ", err.message);
      done(err);
    } else {
      done(null, data);
    }
  });
};

// Usa model.findOne() para devolver un único documento coincidente de tu base de datos
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.log("Error in findOneByFood: ", err.message);
      done(err);
    } else {
      done(null, data);
    }
  });
};

// Usa model.findById() para buscar en tu base de datos por _id
const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) {
      console.log("Error in findPersonById: ", err.message);
      done(err);
    } else {
      done(null, data);
    }
  });
};

// Realiza las actualizaciones clásicas ejecutando "find", "edit" y "save"
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({ _id: personId }, (err, person) => {
    if (err) {
      console.log("Error in findEditThenSave, Person.findById: ", err.message);
      done(err);
    }
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) {
        console.log("Error in findEditThenSave, person.save: ", err.message);
        done(err);
      } else {
        done(null, updatedPerson);
      }
    });
  });
};

// Realiza nuevas actualizaciones en un documento usando model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageToSet } },
    { new: true },
    (err, data) => {
      if (err) {
        console.log("Error in findAndUpdate: ", err.message);
        done(err);
      } else {
        done(null, data);
      }
    }
  );
};

// Elimina un documento usando el método model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndDelete({ _id: personId }, (err, data) => {
    if (err) {
      console.log("Error in findByIdAndDelete: ", err.message);
      done(err);
    } else {
      done(null, data);
    }
  });
};

// Elimina muchos documentos con model.deleteMany()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) {
      console.log("Error in deleteMany: ", err.message);
      return done(err);
    }
    done(null, data);
  });
};

// Auxiliares de consulta de búsqueda en cadena para restringir los resultados de búsqueda
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }) // 1. Buscar por comida favorita
    .sort({ name: 1 }) // 2. Ordenar alfabéticamente
    .limit(2) // 3. Limitar a 2 resultados
    .select("-age") // 4. Excluir el campo age
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
