import React from 'react';
import styles from "./styles.module.scss";
import { BiUser } from 'react-icons/bi';
import { SiMinutemailer } from 'react-icons/si';
import { IoKeyOutline } from 'react-icons/io5';
import { useField, ErrorMessage } from 'formik';

function SelectInput({ icon, options, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className={`
      ${styles.input}
      ${meta.touched && meta.error ? styles.error : ''}
    `}>
      {icon === "user" ?
        (<BiUser />)
        :
        icon === "email" ?
          (<SiMinutemailer />)
          :
          icon === "password" ?
            (<IoKeyOutline />)
            :
            ""
      }
      <select
        name={field.name}
        {...field}
        {...props}
        placeholder='Select an role'
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

export default SelectInput;
