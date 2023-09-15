import React,{useState} from "react";
import UserInput from "../Inputs/UserInput";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import axios from "axios";

const initialValues ={
    role:"",
    permissions:[],
    success:"",
    error:"",
}
function RolePermission() {
    const [roleData, setRoleData] = useState(initialValues);
    const {role,permissions,success,error} = roleData;
    
    const handleRole = (e) =>{
        const {name,value} = e.target;
        setRoleData({...roleData,[name]:value});
        }
    const handlePermissions = (e) =>{
     const { name, value, checked } = e.target;
    if (name === "add" && checked) {
    setRoleData({
      ...roleData,
      permissions: [...permissions, value],
    });
    } else if (name === "add" && !checked) {
     setRoleData({
      ...roleData,
      permissions: permissions.filter((permission) => permission !== value),
     });
    }
    if (name === "edit" && checked) {
     setRoleData({
      ...roleData,
      permissions: [...permissions, value],
     });
    } else if (name === "edit" && !checked) {
     setRoleData({
      ...roleData,
      permissions: permissions.filter((permission) => permission !== value),
     });
    }
    if (name === "delete" && checked) {
    setRoleData({
      ...roleData,
      permissions: [...permissions, value],
     });
    } else if (name === "delete" && !checked) {
    setRoleData({
      ...roleData,
      permissions: permissions.filter((permission) => permission !== value),
    });
    }
    console.log(roleData);
    }
    const roleValidation = Yup.object({
        role : Yup.string().required("Role is Required")
    })

    async function createRole(){
        setRoleData({...roleData,error:"",success:""});
       try {
        const data = {
         role,
         permissions
        };
        const response = await axios.post('http://localhost:5000/api/roles', data);
        if(response.status === 200){
         setRoleData({...roleData,success:"Role added successfully",error:""});
         window.location.reload();
        }else if(response.status === 400){
         setRoleData({...roleData,success:"",error:"Role already exists"});
        }
       } catch (error) {
        console.error("Error:", error);
        setRoleData({ ...roleData, error: "An error occurred, Please try again later." });
     }
    }

    return (
        <div className={styles.roles}>
        <div className={styles.role}>
        <div className={styles.role__header}>
            <h1>Add Role</h1>
            <p>Enter the role you want to add to the users. assign permissions to the roles as per your requirement</p>
        </div>
        <Formik
           enableReinitialize
           initialValues={{
            role
           }}
           validationSchema={roleValidation}
           onSubmit={createRole}
        >
        <Form className={styles.form}>
        <UserInput
           name="role"
           icon="role"
           placeholder="Role - e.g customer" 
           type="text"
           onChange={handleRole}
         />
         <div className={styles.input}>
         <input type="checkbox" name="add" value="add" className={styles.checkbox} onChange={handlePermissions}></input>
         <label for="edit">Add User</label>
         </div>
         <div className={styles.input}>
         <input type="checkbox" name="edit" value="edit" className={styles.checkbox} onChange={handlePermissions}></input>
         <label for="edit">Edit User</label>
         </div>
         <div className={styles.input}s>
         <input type="checkbox" name="delete" value="delete" className={styles.checkbox} onChange={handlePermissions}></input>
         <label for="delete">Delete User</label>
         </div>
         <button type="submit" className={styles.userbtn} >Add Role</button>                            
        </Form>
         </Formik>
         {success && <p className={styles.success}>{success}</p>}
         {error && <p className={styles.error}>{error}</p>}
        </div>
        </div>

    );
}

export default RolePermission;