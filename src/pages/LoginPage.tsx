import { useState } from "react";
import TextField from "../components/TextField";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const disabled = !email || !password
  const navigate = useNavigate()
  const onClick = () => {
    AuthService.login(email, password)
      .then(res => {
        if (res && res.status == 200) {
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("user", JSON.stringify({
            ...res.data.user,
            ...{ password: password }
          }))
          navigate("/admin", { replace: true })
        } else {
          navigate("/", { replace: true })
        }
      })
      .catch(r => {
        console.error(r)
        navigate("/", { replace: true })
      })
  }

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
        <button 
          className={`
            text-xl text-white w-[50%] mx-auto ${
              disabled ? "bg-light-gray" : "bg-primary"
            }
          `}
          disabled={disabled}
          onClick={onClick}
        >
          Masuk
        </button>
      </div>
    </div>
  )
}