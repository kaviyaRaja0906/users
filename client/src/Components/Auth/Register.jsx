import React,{useState} from "react";
import styles from "./styles.module.scss";
import {BsArrowRightShort} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Formik,Form } from "formik";
import * as Yup from "yup";
import LoginInput from "../Inputs/LoginInput";
import axios from "axios";

const initialValues ={
    name:"",
    email:"",
    password:"",
    success:"",
    error:"",
}
function Register(){
    let navigate = useNavigate();
    AOS.init({
        offset: 200,
        duration: 800,
        easing: 'ease-in-out-sine',
        delay: 200,
        once:true,
        mirror: true
      });

      const [user, setUser] = useState(initialValues);
      const { name, email, password, success,error} = user;
  
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
        confirm_password: Yup.string()
        .required("Confirm your password")
        .oneOf([Yup.ref("password")],"Passwords must match")
    });
    async function signUpHandler(){
       console.log("signed up");
        try {
          const { data } = await axios.post("http://localhost:5000/auth/signup", {
            name: user.name,
            email: user.email,
            password: user.password,
          });
          setUser({ ...user, error: "", success: data.message });
          navigate("/home");
        } catch (error) {
          setUser({ ...user, success: "", error: error.response.data.message });
        }
      };
    
    return(
       <div className={styles.register}>
          <div className={styles.register__container}>
            <div className={styles.register__info} data-aos="fade-left">
                <h1>Welcome Back!</h1>
                <p>Already registered as Admin? To keep connected with us please login <br></br>with your personal info</p>
                <button className={styles.info_btn} onClick={()=>navigate('/login')}>Sign in</button>
            </div>
            <div className={styles.register__form} data-aos="fade-right">
                <h1>Create Account</h1>
                <p>Register as admin to add users</p>
                      <Formik
                         enableReinitialize
                         initialValues={{
                            name,
                            email,
                            password,
                            success,
                            error
                         }}
                         validationSchema={RegisterValidation}
                         className={styles.form}
                        >
                            <Form>
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
                              <button type="submit" onClick={signUpHandler} className={styles.form_btn}>Register</button>
                            </Form>
                        </Formik>
                        <div>{success && <span className={styles.success}>{success}</span>}</div>
                        <div>{error && <span className={styles.error}>{error}</span>}</div>
                        <a className={styles.goto} onClick={()=>navigate('/user')}>Are you a user? login here <BsArrowRightShort/></a>
            </div>
          </div>
        </div>
    );
}

export default Register;