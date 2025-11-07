import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddNote = () => {
  const { title, setTitle, content, setContent, backendUrl, token } =
    useContext(AppContext);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/note/add-note",
        { title, content },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);

        setTitle("");
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      });
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <form onSubmit={addNote}>
        <div className="w-72 h-72 flex flex-col items-center gap-5 p-5 bg-white/90 border border-neutral-300 rounded shadow-lg shadow-zinc-300">
          <input
            type="text"
            placeholder="Enter topic name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-60 py-2 px-3 text-center text-black bg-white border-2 border-zinc-300 rounded-full outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            placeholder="Write your notes here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-60 h-36 px-3 py-2 text-zinc-800 bg-white border-2 border-zinc-300 rounded outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          ></textarea>

          <button
            type="submit"
            className="px-6 py-2 rounded-full border border-purple-700 text-purple-700 hover:bg-purple-600 hover:text-white transition-colors duration-300"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
