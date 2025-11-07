import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const LogoutButton = () => {
  const { setToken, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token-note");
    setToken(false);
    navigate("/");
  };

  return (
    <div className="w-full text-right mt-5 pr-16">
      <p className="text-2xl text-zinc-500">
        Welcome{" "}
        <span className="text-purple-600 font-semibold font-serif">
          {userData?.name || "User"}
        </span>
        !
      </p>

      <button
        onClick={logout}
        className="mt-2 mb-2 py-1 px-4 rounded-full border border-purple-500 text-zinc-500 
               hover:bg-purple-600 hover:text-white transition-colors duration-300"
      >
        Logout
      </button>

      <hr className="border-0 h-px bg-zinc-300 mt-2" />
    </div>
  );
};

export default LogoutButton;
