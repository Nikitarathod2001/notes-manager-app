import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const AllNotes = () => {
  const { backendUrl, token } = useContext(AppContext);

  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [noteId, setNoteId] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [title, setTitle] = useState("");
  const [noteData, setNoteData] = useState([]);

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

  const searchNoteData = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTitle(e.target.value);
    if (value.trim() === "") {
      setSearchedData([]);
      return;
    }
    const searchedNotesArray = noteData.filter((note) =>
      note.title.toLowerCase().includes(value)
    );
    setSearchedData(searchedNotesArray);
  };

  const handleSearch = () => {
    const value = searchTitle.toLowerCase();

    if (value.trim() === "") {
      setSearchedData([]);
      return;
    }

    const searchedNotesArray = noteData.filter((note) =>
      note.title.toLowerCase().includes(value)
    );
    setSearchedData(searchedNotesArray);
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <>
      <LogoutButton />

      <div className="w-full min-h-screen flex flex-col items-center gap-10 bg-[#faf9ff] py-10">
        {/* Top Buttons */}
        <div className="w-[400px] mt-4 flex items-center justify-around">
          <button
            onClick={() => navigate("/create-note")}
            className="bg-[#6A0DAD] py-2 px-4 text-white rounded-[6px] font-medium hover:bg-[#550a9e] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Create Note
          </button>

          {noteData.length > 0 && (
            <button
              onClick={() => setIsSearch(true)}
              className="bg-[#6A0DAD] py-2 px-4 text-white rounded-[6px] font-medium hover:bg-[#550a9e] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Search Note
            </button>
          )}
        </div>

        {/* Search Box */}
        {isSearch && (
          <div className="w-fit mx-auto flex gap-3 items-center">
            <input
              type="text"
              placeholder="Enter topic name..."
              value={searchTitle}
              onChange={(e) => searchNoteData(e)}
              className="w-[300px] border border-neutral-400 py-2 px-3 outline-none rounded-[6px] text-zinc-700 placeholder:text-zinc-500 focus:border-[#6A0DAD] transition-all duration-300"
            />
            <button
              onClick={handleSearch}
              className="bg-[#4B0082] hover:bg-[#3f006b] py-2 px-4 text-white rounded-[6px] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Search
            </button>
          </div>
        )}

        {/* Notes Grid */}
        <div className="w-[60vw] sm:w-[80vw] min-h-[300px] mx-auto py-6 px-4 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {searchTitle.trim() !== "" ? (
            searchedData.length > 0 ? (
              searchedData.map((note) => (
                <div
                  key={note._id}
                  onClick={() => navigate(`/notes/${note._id}`)}
                  title="Click to edit note"
                  className="border border-zinc-300 shadow-md hover:shadow-lg p-4 h-[250px] rounded-[10px] bg-white hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <p className="bg-[#6A0DAD] text-white text-center py-1.5 rounded-[4px] font-medium">
                    {note.title}
                  </p>
                  <p className="mt-3 text-neutral-700 line-clamp-5">
                    {note.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-xl text-zinc-600 col-span-full">
                Note not found
              </p>
            )
          ) : noteData.length > 0 ? (
            noteData.map((note) => (
              <div
                key={note._id}
                onClick={() => navigate(`/notes/${note._id}`)}
                title="Click to edit note"
                className="border border-zinc-300 shadow-md hover:shadow-lg p-4 h-[250px] rounded-[10px] bg-white hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <p className="bg-[#6A0DAD] text-white text-center py-1.5 rounded-[4px] font-medium">
                  {note.title}
                </p>
                <p className="mt-3 text-neutral-700 line-clamp-5">
                  {note.content}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <p className="text-center text-3xl text-zinc-500 font-light">
                Nothing to show
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllNotes;
