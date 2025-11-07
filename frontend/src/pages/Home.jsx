import React, { useContext, useEffect, useState } from "react";
import AddNote from "../components/AddNote";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <LogoutButton />
      <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-8 mt-[20px]">
        <h1 className="text-4xl text-[#6A0DAD] font-semibold border-b-2 border-[#6A0DAD] pb-1">
          Create Notes
        </h1>

        <AddNote />

        <button
          onClick={() => navigate("/notes")}
          className="bg-[#8a20d6] hover:bg-[#6A0DAD] text-white py-2 px-4 rounded-[6px] font-medium transition-all duration-300"
        >
          All Notes
        </button>
      </div>
    </>
  );
};

export default Home;
