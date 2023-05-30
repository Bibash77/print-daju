import React, { useCallback, useEffect } from "react";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useSignUpMutation } from "@/store/userApi";
interface FormValues {
  name: string;
  email: string;
  password: string;
}
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short")
    .max(20, "Too Long")
    .required("Name is required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Register = () => {
  const [SignUp, { isLoading, isSuccess }] = useSignUpMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully logged in");
    }
  }, [isSuccess]);

  return (
    <div className="w-1/4 m-auto">
      <h1 className="text-center text-lg font-bold">Register</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await SignUp(values);
          console.log(values);
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <TextField
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              size="small"
              label="Name"
            />
            <p className="text-red">
              {errors.name && touched.name && errors.name}
            </p>
            <TextField
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              size="small"
              label="Email"
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
            />
            {errors.password && touched.password && errors.password}
            <Button type="submit" disabled={isSubmitting} variant="outlined">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
