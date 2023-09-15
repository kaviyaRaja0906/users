import React,{useState} from "react";
import styles from "./styles.module.scss";
import {BsArrowRightShort} from "react-icons/bs";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import LoginInput from "../Inputs/LoginInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues ={
    email:"",
    password:"",
    success:"",
    error:"",
}
function UserLogin() {
    let navigate = useNavigate();
    const [user, setUser] = useState(initialValues);
    const  {email, password,error} = user;

    const handleChange =(e) =>{
      const {name,value} = e.target;
      setUser({...user,[name]:value});
  };
  console.log(user);

  const LoginValidation = Yup.object({
      email : Yup.string().required("Email address is Required").email("Plase enter a valid email address"),
      password : Yup.string().required("Password is Required")
  })

  async function signInHandler(){
    setUser({ ...user, success: "", error: "" });
   try {
    const response = await axios.post("http://localhost:5000/user/signin", {
      email,
      password,
    });

     if (response.status === 200) {
      console.log("Login successful");
      sessionStorage.setItem("id", response.data.id);
      navigate("/user-home"); 
     } else {
     setUser({ ...user, error: "Login failed. Please check your credentials." });
    }
    } catch (error) {
      console.error("Error during login:", error);
      setUser({ ...user, error: "An error occurred during login. Please try again later." });
    }
  }
  
  
  return(
      <div className={styles.register}>
      <div className={styles.register__container}>
      <div className={styles.register__form} data-aos="fade-left">
       <h1>Sign in</h1>
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
              error
              }}
            validationSchema={LoginValidation}
            onSubmit={signInHandler}
          >
           <Form>
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
              <button type="submit" className={styles.form_btn} >login</button>                            
            </Form>
          </Formik>
           {error && (<span className={styles.error}>{error}</span>)}              
            <a onClick={()=>navigate('/login')} className={styles.goto}>Are you a Admin? login here <BsArrowRightShort/></a>
        </div>
        <div className={styles.register__info} data-aos="fade-right">
            <h1>Hello, User!</h1>
            <p>Enter the details given by admin to start<br></br>journey with us.</p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;