import React, { useState,useEffect } from "react";
import styles from "./home.module.scss";
import {IoLogoElectron} from "react-icons/io5";
import {FaUsers,FaUsersCog} from "react-icons/fa";
import {BsPersonFillAdd} from "react-icons/bs";
import RolePermission from "./User/RolePermission";
import AddUser from "./User/AddUser";
import UserList from "./User/UserList";
function Home(){
    const[navToRole, setNavToRole] = useState(true);
    const[navToAddUser, setNavToAddUser] = useState(false);
    const[navToUserList, setNavToUserList] = useState(false);

    const roleNav =()=>{
      setNavToRole(true);
      setNavToAddUser(false);
      setNavToUserList(false);
    }
    const userNav =()=>{
      setNavToAddUser(true);
      setNavToRole(false);
      setNavToUserList(false);
    }
    const usersNav =()=>{
      setNavToUserList(true);
      setNavToAddUser(false);
      setNavToRole(false);
    }
    return(
      <div className={styles.home}>
         <div className={styles.home__container}>
           <div className={styles.home__sidebar}>
              <div className={styles.logo}>
              <IoLogoElectron/><h3>Fyneen</h3>
              </div>
             <div className={styles.menu}>
                <div className={styles.menu__item} onClick={roleNav}>
                   <FaUsersCog/><a>Add Roles</a>
                </div>
                <div className={styles.menu__item} onClick={userNav}>
                    <BsPersonFillAdd/><a>Add User</a>
                </div>
                <div className={styles.menu__item} onClick={usersNav}>
                   <FaUsers/><a>User List</a>
                </div>
             </div>
           </div>
           <div className={styles.home__content}>
             <div className={styles.home__header}>
               <h1>Hello, Super Admin!</h1>
             </div>
              {navToRole && <RolePermission/>}
              {navToAddUser && <AddUser/>}
              {navToUserList && <UserList/>}
           </div>
         </div>
      </div>
    );
}

export default Home;