import React, { useState, useEffect, useContext } from "react";
import FormInput from "../components/FormInput";
import styles from "./login.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { email, password, loading } = values;

  const [inputs, setInputs] = useState([
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please enter a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ]);
  
   // useContext grants access to state
  const {state:{user}, dispatch} = useContext(Context)


  // console.log("State", state);

  // Router
  const router = useRouter();

    // On component mount redirect users away
  // from login page if they are aleady logged in

  useEffect(() =>{

    if(user !== null) router.push("/")

  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });

    try {
      setValues({ ...values, loading: true });
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/login`,
        {
          email,
          password,
        }
      );
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // Up until now if we refresh the page
      // the user detail retrieved from
      // the state is lost. We need to persist the
      // state on page refresh

      // Save user data in local storage
      window.localStorage.setItem("user", JSON.stringify(data));

      // Redirect user after successful login
      router.push("/");

      setValues({ ...values, email: "", password: "" });
      toast.success("Login successful. Please proceed to login");
      setInputs((input) =>
        input.map((obj) => {
          {
            return { ...obj, errorMessage: "" };
          }
        })
      );

      console.log("login Response", data);
    } catch (err) {
      console.log("login Error", err);
      toast.error(err.response.data);
    }
    setValues({ ...values, loading: false });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    // <div className={styles.wrapper}>
    <div className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* <div className={styles.formExtursion}></div> */}
        <h1 className={styles.h1}>Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className={styles.button}>
          {loading ? <SyncOutlined spin /> : "Submit"}
        </button>
        <p className="text-center">
          Do not have an account? <Link href="/login">Register</Link>
        </p>
        {/* </div> */}
      </form>
    </div>
  );
};
export default Login;
