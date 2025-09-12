import { useState } from "react";
import TextField from "../components/TextField";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const disabled = !email || !password;
  const navigate = useNavigate();
  const onLogin = async () => {
    const t = await AuthService.login(email, password);
    if (t) navigate("/admin", { replace: true });
    else navigate("/", { replace: true });
  };

  return (
    <div className="h-[100dvh] flex items-center justify-center px-4">
      <div className="px-16 py-12 flex flex-col gap-8 bg-white rounded-2xl shadow-xl">
        <h2>Login Admin</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!disabled) onLogin();
          }}
        >
          <TextField
            label="Email"
            value={email}
            setValue={setEmail}
            placeholder="Masukkan Email"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="Masukkan Password"
          />
        </form>
        <button
          className={`
            text-xl text-white w-[50%] mx-auto ${
              disabled ? "bg-light-gray" : "bg-primary"
            }
          `}
          disabled={disabled}
          onClick={onLogin}
        >
          Masuk
        </button>
      </div>
    </div>
  );
}
