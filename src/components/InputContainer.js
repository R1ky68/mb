import React from 'react'

export default function InputContainer(props) {
    return (
        <div className={props.divClass} >
            <p>{props.text}</p>
            <input style={{
                width: "300px",
                height: "47px",
                fontSize: "20px",
                padding: "3px",
                background: "#B8FFD3",
                border: "2px solid #000000",
                boxSizing: "border-box"
            }} 
                onChange={props.saveValues} name={props.inputName} placeholder={props.placeholder}
            />
        </div>    
    )
}