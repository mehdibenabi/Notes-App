const express = require("express");
const router = express.Router();
const {authentificateToken}=require("../Middlewares/authToken");

const {CreateNote,EditNote,DeleteNote,GetNotes,GetNoteById,UpdateIsPinned} = require("../Controllers/Notes");

//create note
router.post("/add-note",authentificateToken,CreateNote);

//edit note
router.put("/edit-note/:NoteId", authentificateToken, EditNote);

//delete note
router.delete("/delete-note/:NoteId", authentificateToken, DeleteNote);

//get all notes
router.get("/get-notes", authentificateToken, GetNotes);

//get note by id
router.get("/get-note/:NoteId", authentificateToken, GetNoteById);

//update pin 
router.put("/update-pin/:id",authentificateToken,UpdateIsPinned);



module.exports = router;