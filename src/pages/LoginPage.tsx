import { useState } from "react";
import TextField from "../components/TextField";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="h-[100dvh] flex items-center justify-center px-4">
      <div className="px-16 py-12 flex flex-col gap-8 bg-white rounded-2xl shadow-xl">
        <h2>Login Admin</h2>
        <div className="flex flex-col gap-4">
          <TextField 
            label="Email"
            value={email}
            setValue={setEmail}
            placeholder="Masukkan Email"
          />
          <TextField 
            label="Password"
            value={password}
            setValue={setPassword}
            placeholder="Masukkan Password"
          />
        </div>
        <button className="bg-primary text-xl text-white w-[50%] mx-auto">
          Masuk
        </button>
      </div>
    </div>
  )
}