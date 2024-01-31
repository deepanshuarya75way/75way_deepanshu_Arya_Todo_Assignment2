import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { useLoginMutation } from "../services/AuthApi";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { setUser } from "../store/reducers/authSlice";
import "bootstrap/dist/css/bootstrap.css";

type LoginFormFields = {
  email: string;
  password: string;
};


const initialState = {
  email: "",
  password: "",
};

const Auth = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, []);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialState);
  const { email, password } = formValues;
  const dispatch = useAppDispatch()
  const schema = yup.object({
    email: yup
      .string()
      .email("enter valid email")
      .min(1, "email can't be empty")
      .required("Field required"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "Passowrd must be atleast 8 charchters long"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({ resolver: yupResolver(schema) });
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  useEffect(() => {
    if (isLoginSuccess) {
      const {user } = loginData
      console.log(loginData)
      dispatch(setUser({user}))
      toast.success("Login Success");
      navigate("/dashboard");
    }
    if(isLoginError){
        // @ts-ignore
        toast.error(loginError?.data?.error)
    }
  }, [isLoginSuccess, isLoginError]);

  
  

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    console.log(data);
    if (email && password) {
      await loginUser({ email, password });
    } else {
      toast.error("All firlds are required");
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form className="row g-3" method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-12">
          <label htmlFor="validationServer01" className="form-label">
            Email
          </label>
          <input
            className={
              errors.email ? "form-control is-invalid" : "form-control"
            }
            {...register("email", {
              required: "Email is required fields",
            })}
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            autoFocus
          />
          <div className={errors.email ? "invalid-feedback" : "valid-feedback"}>
            {errors.email ? errors.email.message : ""}
          </div>
        </div>

        <div className="col-md-12">
          <label htmlFor="validationServer01" className="form-label">
            Password
          </label>
          <input
            className={
              errors.password ? "form-control is-invalid" : "form-control"
            }
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <div
            className={errors.password ? "invalid-feedback" : "valid-feedback"}
          >
            {errors.password ? errors.password.message : ""}
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <Link to="/auth/register">Register?</Link>
    </>
  );
};

export default Auth;
