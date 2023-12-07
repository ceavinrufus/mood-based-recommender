import React, { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("YOUR_REGISTER_ENDPOINT", {
        username: username,
        email: email || null,
        full_name: fullName || null,
        gender: gender,
        role: "customer",
        weight: parseFloat(weight),
        height: parseFloat(height),
        birthdate: birthdate,
        password: password,
      });

      // Handle successful registration (redirect, display message, etc.)
      console.log("Registration successful:", response.data);
    } catch (error) {
      // Handle registration error
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="username" className="mb-1">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-md px-2 py-1 text-black"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md px-2 py-1 text-black"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="fullName" className="mb-1">
          Full Name:
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border rounded-md px-2 py-1 text-black"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="gender" className="mb-1">
          Gender:
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border rounded-md px-2 py-1 text-black"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="weight" className="mb-1">
          Weight (kg):
        </label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border rounded-md px-2 py-1 text-black"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="height" className="mb-1">
          Height (cm):
        </label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border rounded-md px-2 py-1 text-black"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="birthdate" className="mb-1">
          Birthdate:
        </label>
        <input
          type="date"
          id="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="border rounded-md px-2 py-1 text-black"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-md px-2 py-1 text-black"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mt-8"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
