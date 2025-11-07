import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterLogin = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Register") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token-note", data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token-note", data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate("/create-note");
      }, 300);
    }
  }, [token]);

  return (
    <div className="relative flex items-center justify-center h-[90vh] bg-[#faf9ff]">
      <form
        onSubmit={onSubmitHandler}
        className="w-[350px] sm:w-[400px] border border-[#e6d7f8] shadow-lg shadow-zinc-300 bg-white px-8 py-8 rounded-[12px] transition-all duration-500 hover:shadow-2xl"
      >
        {/* Title */}
        <h1 className="mb-6 text-2xl font-semibold text-center text-neutral-600">
          <span
            onClick={() => setState("Register")}
            className={`${
              state === "Register"
                ? "text-[#6A0DAD] border-b-2 border-[#6A0DAD] pb-1"
                : "text-zinc-500 hover:text-[#6A0DAD] cursor-pointer"
            } transition-all duration-300`}
          >
            Create Account
          </span>
          <span className="text-neutral-400 px-2">/</span>
          <span
            onClick={() => setState("Login")}
            className={`${
              state === "Login"
                ? "text-[#6A0DAD] border-b-2 border-[#6A0DAD] pb-1"
                : "text-zinc-500 hover:text-[#6A0DAD] cursor-pointer"
            } transition-all duration-300`}
          >
            Login
          </span>
        </h1>

        {/* Name Field (Register only) */}
        {state === "Register" && (
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-zinc-700 text-[15px]">Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="border border-zinc-300 rounded-[6px] p-2 outline-none text-[15px] text-zinc-700 placeholder:text-zinc-400 focus:border-[#6A0DAD] focus:ring-1 focus:ring-[#6A0DAD] transition-all duration-300"
            />
          </div>
        )}

        {/* Email Field */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-zinc-700 text-[15px]">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="border border-zinc-300 rounded-[6px] p-2 outline-none text-[15px] text-zinc-700 placeholder:text-zinc-400 focus:border-[#6A0DAD] focus:ring-1 focus:ring-[#6A0DAD] transition-all duration-300"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-zinc-700 text-[15px]">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="border border-zinc-300 rounded-[6px] p-2 outline-none text-[15px] text-zinc-700 placeholder:text-zinc-400 focus:border-[#6A0DAD] focus:ring-1 focus:ring-[#6A0DAD] transition-all duration-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 bg-[#6A0DAD] text-white rounded-[30px] text-[16px] font-medium hover:bg-[#570b9e] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {state === "Register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default RegisterLogin;
