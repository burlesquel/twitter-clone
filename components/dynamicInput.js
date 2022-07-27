import React from 'react'
import styles from './dynamicInput.module.css'
export default function DynamicInput({name, placeholder, type=undefined, required=false }) {
  return (
    <div className={styles.main}>
        <input required={required} type={type} name={name} className={styles.input} placeholder={null}/>
        <span className={styles.span}>{placeholder}</span>
    </div>
  )
}
