const db = require('../_helpers/db');
const Category = db.Category;
const ObjectID = require('mongodb').ObjectID;

const userService = require('../services/user.service.js');

//get a category
async function get() {
  return await Category.find();
}

//add new category
async function create(newCategory, userId) {
  const user = await userService.getById(userId);

  //if not admin, deny access
  if (!(user.userType === 1))
    throw new Error('You are not allowed to create category!');

  const category = new Category(newCategory);
  category.save();
}

//delete category
async function _delete(id, userId) {
  const user = await userService.getById(userId);

  //if not admin, deny access
  if (!(user.userType === 1))
    throw new Error('You are not allowed to delete category!');

  return await Category.deleteOne({ _id: ObjectID(id) });
}

module.exports = { get, create, _delete };
