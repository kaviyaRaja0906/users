import React,{useState,useEffect} from "react";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import LoginInput from "../Inputs/LoginInput";
import axios from "axios";
import SelectInput from "../Inputs/SelectInput";

const initialValues ={
    name:"",
    email:"",
    password:"",
    role:"",
    success:"",
    error:"",
}

function AddUser() {
      const [user, setUser] = useState(initialValues);
      const [options, setOptions] = useState([]);
      const { name, email, password,role, success,error} = user;
  
      const handleChange =(e) =>{
          const {name,value} = e.target;
          setUser({...user,[name]:value});
      };
      console.log(user);
      
    const RegisterValidation = Yup.object({
        name: Yup.string()
        .required("What is your name?")
        .min(3, "Full name must contain 3 to 16 characters")
        .max(16, "Full name must contain 3 to 16 characters")
        .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed"),
        email: Yup.string()
        .required("Enter your email address")
        .email("Plase enter a valid email address"),
        password: Yup.string()
        .required("Enter a combination of atleast one number,letter and special character")
        .min(6, "Password must be at least 8 characters")
        .max(16, "Password must be at least 8 characters"),
        role: Yup.string()
        .required("Select a Role"),
    });
    async function signUpHandler(){
        try {
          const { data } = await axios.post("http://localhost:5000/user/signup", {
            name,
            email,
            password,
            role
          });
          setUser({ ...user, error: "", success: data.message });
          window.location.reload();
          
        } catch (error) {
          setUser({ ...user, success: "", error: error.response.data.message });
        }
      };

      useEffect(() => {
        const fetchRoles = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/roles"); 
            const fetchedRoles = response.data; 
            setOptions(fetchedRoles);
            console.log(options);
          } catch (error) {
            console.error("Error fetching roles:", error);
          }
        };
    
        fetchRoles();
      },[]);

    return(
    <div className={styles.roles}>
        <div className={styles.role}>
        <div className={styles.role__header}>
            <h1>Add User</h1>
            <p>Add a user with necessary details and assign role here</p>
        </div>
        <Formik
           enableReinitialize
           initialValues={{
            name,
            email,
            role,
            password,
            success,
            error
            }}
            validationSchema={RegisterValidation}
            onSubmit={signUpHandler}          
        >
         <Form  className={styles.form}>
            <LoginInput 
            type="text"
            name="name"
            icon="user" 
            placeholder="Full Name"
            onChange={handleChange}
            />
            <LoginInput 
             type="email"
             name="email"
             icon="email" 
             placeholder="Email address"
             onChange={handleChange}
            />
            <LoginInput 
             type="password"
             name="password"
             icon="password" 
             placeholder="Password"
             onChange={handleChange}
            />
            <SelectInput icon="user" name="role" placeholder="Role" onChange={handleChange}
              options={options.map((option) => ({
              value: option.role, 
              label: option.role, 
             }))} />

            <button  type="submit" className={styles.userbtn}>Register</button>
          </Form>
        </Formik>
        <div>{success && <span className={styles.success}>{success}</span>}</div>
        <div>{error && <span className={styles.error}>{error}</span>}</div>

        </div>
        </div>
    );
}

export default AddUser;