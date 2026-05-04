import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { UserRegisterPayload } from "@/lib/types";
import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const [userRegisterData, setUserRegisterData] = useState<UserRegisterPayload>(
    { username: "", firstName: "", lastName: "", email: "", password: "" },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser();
  };

  const registerUser = async () => {
    try {
      const url = "http://localhost:8080/api/v1/users/register";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegisterData),
      });

      if (!res.ok) throw new Error("failed to register");

      console.log("post result", res.status);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <div className="m-auto p-8">
      <div className="m-auto mt-16 p-16 max-w-1/2 bg-zinc-900 rounded-xl ">
        <div className="w-fit font-bold text-2xl">Register</div>
        <form onSubmit={handleSubmit}>
          <Field className="mt-8">
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              name="username"
              placeholder="femtosane"
              required
              onChange={(e) =>
                setUserRegisterData({
                  ...userRegisterData,
                  username: e.target.value,
                })
              }
            />
          </Field>
          <FieldGroup className="grid grid-cols-2 mt-4 ">
            <Field>
              <FieldLabel htmlFor="first-name">First Name</FieldLabel>
              <Input
                id="first-name"
                name="first-name"
                placeholder="Arpit"
                required
                onChange={(e) =>
                  setUserRegisterData({
                    ...userRegisterData,
                    firstName: e.target.value,
                  })
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
              <Input
                id="last-name"
                name="last-name"
                placeholder="Gahlot"
                required
                onChange={(e) =>
                  setUserRegisterData({
                    ...userRegisterData,
                    lastName: e.target.value,
                  })
                }
              />
            </Field>
          </FieldGroup>
          <Field className="mt-4">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              placeholder="arpitgahlot2003@gmail.com"
              required
              onChange={(e) =>
                setUserRegisterData({
                  ...userRegisterData,
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
                setUserRegisterData({
                  ...userRegisterData,
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
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
