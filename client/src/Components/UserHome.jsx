import React, { useState,useEffect } from "react";
import styles from "./home.module.scss";
import {IoLogoElectron} from "react-icons/io5";
import {FaUsers,FaUsersCog} from "react-icons/fa";
import {BsPersonFillAdd} from "react-icons/bs";
import RolePermission from "./User/RolePermission";
import AddUser from "./User/AddUser";
import UserList from "./User/UserList";
import axios from "axios";

function UserHome(){
    const[navToAddUser, setNavToAddUser] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const [navToUserList, setNavToUserList] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const id = sessionStorage.getItem("id");

    const userNav =()=>{
      setNavToAddUser(true);
      setNavToUserList(false);
    }
    const usersNav =()=>{
      setNavToUserList(true);
      setNavToAddUser(false);
    }


    useEffect( () => {
         axios.get(`http://localhost:5000/user/${id}`)
        .then((response) => {
          setUserDetails(response.data);
          console.log("User Details:", userDetails);
          const role = response.data.role;
          axios.get(`http://localhost:5000/api/role/${role}`)
          .then((response) => {
            console.log("Role Details:", response.data);
            setPermissions(response.data.permissions);
          })
          .catch((error) => {
            console.error("Error fetching role details:", error);
          })
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    },[]);
    return(
      <div className={styles.home}>
         <div className={styles.home__container}>
           <div className={styles.home__sidebar}>
              <div className={styles.logo}>
              <IoLogoElectron/><h3>Fyneen</h3>
              </div>
             <div className={styles.menu}>
             {permissions.includes("add") && (
                <div className={styles.menu__item} onClick={userNav}>
                    <BsPersonFillAdd/><a>Add User</a>
                </div>
             )}
                <div className={styles.menu__item} onClick={usersNav}>
                    <FaUsers/><a>User List</a>
                </div>
             </div>
           </div>
           <div className={styles.home__content}>
             <div className={styles.home__header}>
               <h1>Hello, {userDetails.name}!</h1>
             </div>
              {navToAddUser && <AddUser/>}
              {navToUserList && <UserList permissions={permissions}/>}
           </div>
         </div>
      </div>
    );
}

export default UserHome;