import React from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LogoutButton from "../components/LogoutButton";

const SingleNote = () => {
  const { id } = useParams();
  const { backendUrl, token } = useContext(AppContext);
  const [noteData, setNoteData] = useState([]);
  const [singleNote, setSingleNote] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const getAllNotes = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/note/get-allnotes", {
        headers: { token },
      });
      if (data.success) {
        if (data.allNotes) {
          setNoteData(data.allNotes);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getSingleNote = () => {
    const foundNote = noteData.find((note) => note._id === id);
    setSingleNote(foundNote);
  };

  const updateNoteContent = async () => {
    try {
      const content = singleNote.content;

      const { data } = await axios.post(
        backendUrl + "/api/note/update-content",
        { content, id }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteNote = async () => {
    try {
      const noteId = singleNote._id;

      const { data } = await axios.delete(
        backendUrl + "/api/note/delete-note",
        { data: { noteId } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllNotes();
        navigate("/notes");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (noteData.length > 0) {
      getSingleNote();
    }
  }, [noteData, id]);

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    singleNote && (
      <>
        <LogoutButton />

        <div className="w-[85vw] min-h-[75vh] mx-auto flex flex-col items-center mt-[50px] gap-8">
          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => navigate("/create-note")}
              className="bg-[#6A0DAD] hover:bg-[#530888] text-white py-2 px-5 rounded-[8px] font-medium shadow-md transition-all duration-300"
            >
              Create Note
            </button>
            <button
              onClick={() => navigate("/notes")}
              className="bg-[#6A0DAD] hover:bg-[#530888] text-white py-2 px-5 rounded-[8px] font-medium shadow-md transition-all duration-300"
            >
              All Notes
            </button>
          </div>

          {/* Note Container */}
          <div className="border border-[#e4d5f2] shadow-lg shadow-zinc-300 rounded-[10px] w-full max-w-[550px] min-h-[320px] py-6 px-8 bg-white transition-all duration-300 hover:shadow-2xl">
            <p className="bg-[#3d3d3d] text-white text-center py-2 rounded-[6px] text-[18px] font-semibold tracking-wide">
              {singleNote.title}
            </p>

            {isEdit ? (
              <textarea
                className="border border-zinc-400 outline-none rounded-[6px] w-full mt-6 text-zinc-700 h-[160px] p-3 resize-none focus:border-[#6A0DAD] focus:ring-1 focus:ring-[#6A0DAD] transition-all duration-300"
                value={singleNote.content}
                onChange={(e) =>
                  setSingleNote((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
              ></textarea>
            ) : (
              <p className="mt-6 text-zinc-700 leading-relaxed whitespace-pre-wrap">
                {singleNote.content}
              </p>
            )}
          </div>

          {/* Action Buttons (Save / Edit / Delete) */}
          <div className="w-full text-center mt-2">
            {isEdit ? (
              <button
                onClick={updateNoteContent}
                className="bg-[#6A0DAD] hover:bg-[#530888] text-white py-2 px-6 rounded-full font-medium shadow-md transition-all duration-300"
              >
                Save
              </button>
            ) : (
              <div className="flex justify-center gap-8">
                <button
                  onClick={() => setIsEdit(true)}
                  className="border border-[#6A0DAD] text-[#6A0DAD] py-2 px-6 rounded-full font-medium hover:bg-[#530888] hover:text-white transition-all duration-300 shadow-sm"
                >
                  Edit
                </button>
                <button
                  onClick={deleteNote}
                  className="border border-red-500 text-red-500 py-2 px-6 rounded-full font-medium hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default SingleNote;
