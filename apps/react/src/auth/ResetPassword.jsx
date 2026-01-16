import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../auth-utility/axiosInstance";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const validPasss = password !== "" && password === repeatPassword;
  const handleResetPassword = async () => {
    console.log("aaa");

    try {
      const res = await api.post(`/reset-password/${token}`, {
        password,
      });
      console.log(res.data);

      if (res.data.success) {
        alert(
          "Successfully reset your password, please return to the login page to continue."
        );
      }
    } catch (error) {
      console.log(error.message);

      alert("error::", error.message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center ">
      <div className="mt-24 bg-white p-10 rounded-xl shadow-2xl w-1/3">
        <div className="mb-6">
          <input
            type="password"
            value={password}
            id="password"
            placeholder="Enter password..."
            onChange={(e) => setPassword(e.target.value)}
            className="w-full auth_input"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={repeatPassword}
            id="password"
            placeholder="Re enter password..."
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="w-full auth_input"
          />
        </div>

        <div className="w-full flex justify-between">
          <button
            className="bg-slate-100 hover:shadow-lg hover:bg-slate-300"
            type="button"
            onClick={() => {
              setPassword("");
              setRepeatPassword("");
            }}
          >
            Clear
          </button>
          <button
            className={
              validPasss ? "auth_button" : "bg-slate-100 cursor-not-allowed"
            }
            disabled={!validPasss}
            onClick={() => (validPasss ? handleResetPassword() : null)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
