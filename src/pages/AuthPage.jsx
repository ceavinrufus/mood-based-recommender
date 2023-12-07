import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function AuthPage() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center ">
      <div className="flex flex-col p-10 rounded-xl gap-6 bg-gray-200 w-[600px]">
        <div className="flex justify-around mb-4">
          <button
            className={`text-lg font-bold py-1 focus:outline-none relative z-10 ${
              isLoginFormVisible
                ? "text-blue-500 underline underline-offset-2"
                : "text-gray-500"
            }`}
            onClick={() => setIsLoginFormVisible(true)}
          >
            Login
          </button>
          <button
            className={`text-lg font-bold py-1 focus:outline-none relative z-10 ${
              !isLoginFormVisible
                ? "text-blue-500 underline underline-offset-2"
                : "text-gray-500"
            }`}
            onClick={() => setIsLoginFormVisible(false)}
          >
            Register
          </button>
        </div>
        <div
          className={`${
            !isLoginFormVisible ? "max-h-[700px]" : "max-h-[250px]"
          } duration-500 overflow-hidden h-full transition-max-h`}
        >
          {isLoginFormVisible ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
