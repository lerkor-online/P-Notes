require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY
} = process.env;

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, 
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
    }
  }, 
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Notes, Categories, Users } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
/* Notes.belongsToMany(Categories, { through: "NoteCategory" });
Categories.belongsToMany(Notes, { through: "NoteCategory" });

Notes.belongsTo(Users);
Users.hasMany(Notes); */

// Asociación entre Notes y Categories con un campo adicional 'order'
Notes.belongsToMany(Categories, { through: "NoteCategory", as: 'Categories', foreignKey: 'noteId' });
Categories.belongsToMany(Notes, { through: "NoteCategory", as: 'Notes', foreignKey: 'categoryId' });

// Asociación entre Notes y Users
Notes.belongsTo(Users);
Users.hasMany(Notes);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};