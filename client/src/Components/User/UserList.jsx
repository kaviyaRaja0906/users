import React,{useState,useEffect} from "react";
import styles from "./styles.module.scss";
import {CgDanger} from "react-icons/cg";
import {GrEdit} from "react-icons/gr";
import {RiDeleteBin6Line} from "react-icons/ri";
import Modal from 'react-modal';
import { Formik,Form } from "formik";
import * as Yup from "yup";
import LoginInput from "../Inputs/LoginInput";
import SelectInput from "../Inputs/SelectInput";
import axios from "axios";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '35%',
    transform: 'translate(-50%, -50%)',
  },
};

const initialValues ={
  name:"",
  email:"",
  password:"",
  success:"",
  error:"",
}

function UserList({permissions}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState(initialValues);
  const [options, setOptions] = useState([]);
  const { name, email, password, role, success,error} = user;

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    console.log("Closing modal");
    setModalIsOpen(false);
  }
   const [users, setUsers] = useState([]);

   useEffect(() => {
    const fetchUsers = async () => {
       const response = await fetch("http://localhost:5000/user/all");
       const data = await response.json();
       setUsers(data);
    }
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
    fetchUsers();  
   },[]);
   const handleChange =(e) =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value});
};
console.log(user);

const EditValidation = Yup.object({
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
async function updateHandler(id) {
  try {
    const response = await axios.put(`http://localhost:5000/user/edit/${id}`, {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    
    if (response.data.success) {
      setUser({
        ...user,
        error: "",
        success: response.data.message,
        name: response.data.user.name,
        email: response.data.user.email,
        role: response.data.user.role,
      });
    } else {
      setUser({ ...user, success: "", error: response.data.message });
    }
    closeModal();
  } catch (error) {
    setUser({ ...user, success: "", error: "Error updating user." });
  }
}



   async function handleDelete(id){
     try{
      const response = await fetch(`http://localhost:5000/user/delete/${id}`,
      {method: "DELETE",}
      );

    if (response.ok) {
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } else {
      throw new Error("Failed to delete user.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
     } 
   }
    return (
        <div>
        {users.length === 0 ? (
          <div className={styles.users}>
          <div className={styles.userlist}>
          <span><CgDanger/>Users not found</span>   
        </div>
        </div>

        ):(
          <div className={styles.userlist}>
          {users.map((user) => (
            <div className={styles.user} key={user._id}>
              <span>Name : {user.name}</span>
              <span>Email : {user.email}</span>
              <span>Role : {user.role}</span>
              <div className={styles.user__btn}>
              {
               permissions && permissions.includes("edit") &&
                <button className={styles.edit} onClick={openModal}><GrEdit/> Edit</button>
              }
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
               > 
                 <div className={styles.modal}>
                 <h1>Edit Form</h1>
                    <Formik
                         enableReinitialize
                         initialValues={{
                          name,
                          email,
                          password,
                          role,
                          success,
                           error,
                         }}
                         className={styles.form}
                         validationSchema={EditValidation}
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
                              <SelectInput icon="user" name="role" placeholder="Role" onChange={handleChange}
                                options={options.map((option) => ({
                                value: option.role, 
                                label: option.role, 
                              }))} />
                              <button type="submit" onClick={() => updateHandler(user._id)} className={styles.update}>Update</button>
                            </Form>
                        </Formik>
                        <div>{success && <span className={styles.success}>{success}</span>}</div>
                        <div>{error && <span className={styles.error}>{error}</span>}</div>

                 </div>
              </Modal>
              {
                permissions && permissions.includes("delete") &&
                <button className={styles.delete} onClick={() => handleDelete(user._id)}><RiDeleteBin6Line/> Delete</button>
              }
              </div>
            </div>
          ))}
          </div>
        )
        }
        </div>



    );
}

export default UserList;
