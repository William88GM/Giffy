import { useState } from "react";
import { LoginMenu } from "./LoginMenu";
import { RegisterMenu } from "./RegisterMenu";

export function LoginLogup() {
  const [showLogOrReg, setLogOrReg] = useState("Login");

  return showLogOrReg === "Login" ? (
    <LoginMenu setMenuToRegister={setLogOrReg} />
  ) : (
    <RegisterMenu setMenuToLogin={setLogOrReg} />
  );
}
