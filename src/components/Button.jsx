import React from 'react'
import clsx from "clsx"
const Button = (props) => {
    const { icon, type, label, disabled, className, onClick = () => { } } = props;
    return (
        <button
            type={type || "button"}
            className={clsx("px-3 py-2 outline-none disabled:cursor-not-allowed", className)}
            disabled={disabled}
            onClick={onClick}
        >
            <span>{label}</span>
            {icon && icon}
        </button>
    )
}

export default Button
