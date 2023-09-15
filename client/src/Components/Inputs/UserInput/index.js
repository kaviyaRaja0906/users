import React from 'react';
import styles from "./styles.module.scss";
import { BiUser } from 'react-icons/bi';
import {useField, ErrorMessage} from 'formik';

function UserInput({icon, placeholder,...props}) {
    const [field, meta] = useField(props);
    return (
        <div className={`
        ${styles.input} 
        ${meta.touched && meta.error ? styles.error : ''
        }`}>
           {icon === "role" ? 
           (<BiUser />)
           :
           ""
           }
           <input 
           type={field.type}
           name={field.name} 
           placeholder={placeholder}
           {...field}
           {...props}
            />
            {
                meta.touched && meta.error && (
                    <div className={styles.error__popup}>
                      <span></span>  
                      <ErrorMessage name={field.name} />  
                    </div>
                )
            }
        </div>
    )
}


export default UserInput;
