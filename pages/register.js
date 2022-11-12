// Register form using Bootstrap

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.table({ name, email, password });
//   };

//   return (
//     <>
//       <h1 className="jumbotron h-100 p-5  text-center bg-primary square">
//         Register
//       </h1>
//       <div className="container col-md-4 offset-md-4 pb-5">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             className="form-control mb-4 p-3"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter name"
//             required
//           />
//           <input
//             type="email"
//             className="form-control mb-4 p-3"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter email"
//             required
//           />
//           <input
//             type="password"
//             className="form-control mb-4 p-3"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter password"
//             required
//           />
//           <div class="d-grid gap-2">
//             <button type="submit" className="btn btn-primary p-2">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

//===============================================================================//

// Register form using custom css
import React, { useState } from "react";
import FormInput from "../components/FormInput";
import styles from "./register.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link"

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    // birthday: "",
    password: "",
    loading: false,
    // confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password, loading } = values;

  const [inputs, setInputs] = useState([
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage:
        "Name should be 3-16 characters and should not include any special character",
      label: "Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setValues({ ...values, loading: true });
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
        name,
        email,
        password,
      });
      if (data.ok) {
        setValues({ name: "", email: "", password: "" });
        toast.success("Registration successful. Please proceed to login");
        setInputs((input) =>
          input.map((obj) => {
            {
              return { ...obj, errorMessage: "" };
            }
          })
        );
      }
      console.log("Register Response", data);
    } catch (err) {
      console.log("Register Error", err);
      toast.error(err.response.data);
    }
    setValues({ ...values, loading: false });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className={styles.register}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* <div className={styles.formExtursion}></div> */}
        <h1 className={styles.h1}>Register</h1>
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
      </form>
    </div>
      <p className="text-center p-3">
          Already registered?{" "}
          <Link href="/login">
       Login
          </Link>
        </p>
        </>
  );
};
export default Register;
