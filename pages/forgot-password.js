import React, { useState, useEffect, useContext } from "react";
import FormInput from "../components/FormInput";
import styles from "./forgot-password.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
// In the begining we just display the email fields.
// User enters email, we lookup email in the database.
// If user is found, we will send the reset email to user
// and send back the success response
  const [values, setValues] = useState({
    email: "",
    loading: false,
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const { email, loading } = values;

  const [inputs, setInputs] = useState([
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Enter Email Address",
      errorMessage: "Please enter a valid email address",
      label: "Email",
      required: true,
    },

  ]);

// If success response is sent back,
// we display the rest of the form to enter password and code
  const [success, setSuccess] = useState("");
// State for storing the code sent to user
  const [code, setCode] = useState("");

  const [newPassword, setNewPassword] = useState("");
  
// useContext grants access to state
  const {state:{user}, dispatch} = useContext(Context)

// Router
  const router = useRouter();

// On component mount redirect users away
// from login page if they are aleady logged in
  useEffect(() =>{

    if(user !== null) router.push("/")

  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ email });

    try {
      setValues({ ...values, loading: true });
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/forgot-password`,
        {
          email,
        },
        {withCredentials:true}
      );
      setValues({ ...values, email: "" });
      setSuccess(true);
      toast.success("Check you email for further instructions on how to reset your password");
      setInputs((input) =>
        input.map((obj) => {
          {
            return { ...obj, errorMessage: "" };
          }
        })
      );

      console.log("Reset Password Response", data);
    } catch (err) {
      console.log("Reset Password Error", err);
      // toast.error(err.response.data);
    }
    setValues({ ...values, loading: false });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // console.log(email, code, newPassword);
    // return;
    try {
        setValues({ ...values, loading: true });
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/reset-password`, {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassword("");
      setValues({ ...values, loading: false });
    } catch (err) {
        setValues({ ...values, loading: false });
      toast(err.response.data);
    }
  };


  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    // <div className={styles.wrapper}>
    <div className={styles.resetPassword}>
      <form className={styles.form} onSubmit={success ? handleResetPassword:handleSubmit}>
        {/* <div className={styles.formExtursion}></div> */}
        <h1 className={styles.h1}>Reset Password</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
               {success && (
            <>
              <input
                type="text"
                className="form-control mb-2 "
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
                required
              />

              <input
                type="password"
                className="form-control mb-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
              />
            </>
          )}
        <button className={styles.button}  disabled={loading || !email}>
          {loading ? <SyncOutlined spin /> : "Submit"}
        </button>
        {/* </div> */}
      </form>
    </div>
  );
};
export default ForgotPassword;
