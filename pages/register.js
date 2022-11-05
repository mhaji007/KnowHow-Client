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
import styles from "./register.module.css"


const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    // birthday: "",
    password: "",
    // confirmPassword: "",
  });

  const {name, email, password} = values

  const inputs = [
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
    // {
    //   id: 3,
    //   name: "birthday",
    //   type: "date",
    //   placeholder: "Birthday",
    //   label: "Birthday",
    // },
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
    // {
    //   id: 5,
    //   name: "confirmPassword",
    //   type: "password",
    //   placeholder: "Confirm Password",
    //   errorMessage: "Passwords don't match!",
    //   label: "Confirm Password",
    //   pattern: values.password,
    //   required: true,
    // },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ name, email, password });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.register}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.h1}>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className={styles.button}>Submit</button>
      </form>
    </div>
  );
};
export default Register;
