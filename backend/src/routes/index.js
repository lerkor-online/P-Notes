const postUser = require("../controllers/postUser");
const getUser = require("../controllers/getUser");
const postNote = require("../controllers/postNote");
const getAllNotesByUser = require("../controllers/getAllNotesByUser");
const deleteNoteById = require("../controllers/deleteNoteById");
const postCategory = require("../controllers/postCategory");
const getAllCategories = require("../controllers/getAllCategories");
const editNote = require("../controllers/editNoteById");

const { Router } = require("express");

const router = Router();

router.post("/user", postUser);
router.post("/login", getUser);
router.post("/note", postNote);
router.get("/note/:idUser", getAllNotesByUser);
router.delete("/note/:idNote", deleteNoteById);
router.put("/note", editNote);
router.post("/category", postCategory);
router.get("/category", getAllCategories);


module.exports = router;
