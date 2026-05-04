import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import type { UserLoginPayload } from "@/lib/types";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [userLoginData, setUserLoginData] = useState<UserLoginPayload>({
    email: "",
    password: "",
  });
  const [result, setResult] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser();
  };

  const loginUser = async () => {
    try {
      const url = "http://localhost:8080/api/v1/users/login";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginData),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      console.log("post result", res.status);

      setResult("success");
      const token = await res.text();
      login(token);
      navigate("/");
    } catch (error) {
      console.error(error);
      setResult("failed");
    }
  };

  return (
    <div className="m-auto p-8">
      <div className="m-auto mt-16 p-16 max-w-1/2 bg-zinc-900 rounded-xl ">
        <div className="w-fit font-bold text-2xl">Login</div>
        <form onSubmit={handleSubmit}>
          <Field className="mt-4">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              placeholder="arpitgahlot2003@gmail.com"
              required
              onChange={(e) =>
                setUserLoginData({
                  ...userLoginData,
                  email: e.target.value,
                })
              }
            />
          </Field>
          <Field className="mt-4">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              placeholder="**********"
              type="password"
              required
              onChange={(e) =>
                setUserLoginData({
                  ...userLoginData,
                  password: e.target.value,
                })
              }
            />
          </Field>
          <Button
            className="mt-8 w-full text-md font-bold cursor-pointer "
            size="lg"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
      <div>{result}</div>
    </div>
  );
};

export default Login;
