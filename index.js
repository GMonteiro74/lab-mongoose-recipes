const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  }).then (() => {
    updateDatabase();
  })
//   .then(() => {
//     Recipe.create({
//       title: 'Bacalhau à brás',
//       level: 'Easy Peasy',
//       ingredients: ['cod', 'eggs', 'fries'],
//       cuisine: 'portuguese',
//       dishType: 'main_course',
//     })
//     Recipe.insertMany(data);
//     Recipe.findOneAndUpdate({name: 'Rigatoni alla Genovese'}, 
//     {
//       duration: 100
//     });
//     Recipe.deleteOne({name: 'Carrot Cake'}).then(() => {
//       console.log('recipe deleted');
//     }).catch((err) => {
//       console.log('error deleting', err);
//     })

//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });

// async function connect() {
//     await mongoose.connect(MONGODB_URI, {
//           useCreateIndex: true,
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//           useFindAndModify: false
//         }); 
//     console.log("database connection successful");
//     updateDatabase();
    
// }

async function updateDatabase() {
  try {
    const createdRecipe = await Recipe.create({
      title: 'Bacalhau à brás',
      level: 'Easy Peasy',
      ingredients: ['cod', 'eggs', 'fries'],
      cuisine: 'portuguese',
      dishType: 'main_course',
    })
    console.log(createdRecipe.title)
    
    await Recipe.insertMany(data, data.map(recipe => {console.log(recipe.title)}))
    
    await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, 
    {
      duration: 100
    });
    await Recipe.deleteOne({title: 'Carrot Cake'});
  } catch (error) {
    console.log('Error', error);
  } finally {
    mongoose.connection.close();
  }
  
}

// connect();