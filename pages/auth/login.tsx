import React, { Fragment } from "react";
import { Formik } from "formik";
import { Button, Card, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import * as Yup from "yup";
import { useRouter } from "next/router";

interface FormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = () => {
  const router=useRouter()
  return (
    <Card className="w-1/4 m-auto mt-48" elevation={3}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await signIn("credentials", {
              email: values.email,
              password: values.password,
            });

            toast.success("Successfully Signed in");
          } catch (error) {
            toast.error("Something went wrong");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="p-7">
            <h1 className="text-center text-2xl font-bold">Login</h1>
            <TextField
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              size="small"
              label="Email"
              fullWidth
            />
            <p className="text-red">
              {errors.email && touched.email && errors.email}
            </p>

            <TextField
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              size="small"
              label="Password"
              fullWidth
            />
            {errors.password && touched.password && errors.password}

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="outlined"
              fullWidth
              disableElevation
            >
              Submit
            </Button>
            <div>
              <p className="text-sm text-gray-400 text-center mt-3">
                Or login with
              </p>
            </div>

            <div className=" flex items-center justify-center gap-7 p-1">
              <span className="bg-slate-100 rounded-full p-3  cursor-pointer hover:bg-gray-300 ">
                <FcGoogle size={25} />
              </span>
              <span className="bg-slate-100 rounded-full p-3  cursor-pointer hover:bg-gray-300">
                <FaFacebookF size={25} />
              </span>
            </div>
            <div className="text-sm text-gray-400 mt-5 text-center cursor-pointer" onClick={()=>{
              router.push("/auth/register")

            }}>
              Not a member ? <span className="underline">Signup</span>
            </div>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default Login;
