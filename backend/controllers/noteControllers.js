import express from "express";
import noteModel from "../models/noteModel.js";

// --- API to add notes on database ---
const addNote = async (req, res) => {
  try {

    const {title, content} = req.body;
    const userId = req.userId;

    if(!title || !content) {
      return res.json({
        success: false,
        message: "Missing data"
      });
    }

    const newnote = new noteModel({title, content, userId});
    await newnote.save();

    res.json({
      success: true,
      message: "Notes added successfully!"
    });
    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// --- API to get all notes in array ---
const getAllNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const allNotes = await noteModel.find({userId});
    if(allNotes.length === 0) {
      return res.json({
        success: false,
        message: "Nothing is added"
      });
    }

    res.json({
      success: true,
      allNotes
    });
    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// --- API to update note content ---
const updateNoteContent = async (req, res) => {
  try {

    const {content, id} = req.body;

    await noteModel.findByIdAndUpdate(id, {content});

    res.json({
      success: true,
      message: "Note updated successfully!"
    });
    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// --- API to delete note ---
const deleteNote = async (req, res) => {
  try {

    const {noteId} = req.body;
    await noteModel.findByIdAndDelete(noteId);

    res.json({
      success: true,
      message: "Note Deleted Successfully!"
    });
    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};


export {addNote, getAllNotes, updateNoteContent, deleteNote};