import express from "express";
import { addNote, deleteNote, getAllNotes, updateNoteContent } from "../controllers/noteControllers.js";
import authUser from "../middlewares/authUser.js";

const noteRouter = express.Router();

noteRouter.post("/add-note", authUser , addNote);
noteRouter.get("/get-allnotes", authUser , getAllNotes);
noteRouter.post("/update-content" , updateNoteContent);
noteRouter.delete("/delete-note", deleteNote);

export default noteRouter;