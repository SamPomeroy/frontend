import React from 'react'

function Button(props) {
    const {clickFunc, text, css} = props
  return (
    <>
        <button id={css} onClick={clickFunc} >{text}</button>
    </>
  )
}

export default Button