import React, { useRef, useState } from 'react'
import styles from './dynamicInput.module.css'
export default function DynamicInput({ name, placeholder, type = undefined, theme, themeChangeOnClick, required = false, value="", ...props }) {

  const [currentTheme, setCurrentTheme] = useState(theme)
  const [currentValue, setCurrentValue] = useState(value)

  const inputRef = useRef()

  const themes = {
    dark: {

      main: {},
      input: {
        borderColor: "#313437",
        borderWidth: 2,
      },
      span: {
        color: "#313437",
        backgroundColor: "black"
      }

    },
    normal: {

      main: {
        borderColor: "#E6EBEE",
        borderWidth: 2,
        borderRadius: 10
      },
      input: {
        borderColor: "#E6EBEE",
        borderWidth: 2,
      },
      span: {
        color: "gray",
        backgroundColor: "white"
      }

    },

    light: {

      main: {
        borderColor: "#55B3F3",
        borderWidth: 2,
        borderRadius: 10
        // backgroundColor: "blue"
      },
      input: {
        borderColor: "#55B3F3",
        borderWidth: 2,
      },
      span: {
        color: "#55B3F3",
        backgroundColor: "white"
      }

    }
  }

  return (
    <div style={themes[currentTheme]?.main} className={`${styles.main} ${props.className}`}>

      <input
        onFocus={() => { setCurrentTheme(themeChangeOnClick) }}
        onBlur={() => { setCurrentTheme(theme) }}
        style={themes[currentTheme]?.input}
        required={required}
        type={type}
        name={name}
        className={styles.input}
        placeholder={null}
        ref={inputRef}
        value={currentValue}
        onChange={(e)=>{setCurrentValue(e.target.value)}} />

      <span
        onClick={() => { inputRef.current.focus() }}
        style={themes[currentTheme]?.span}
        className={styles.span}>{placeholder}
      </span>

    </div>
  )
}
