import React from 'react';
import { IButtonProps } from '../../Interfaces/Button/IButton';

const Button:React.FC<IButtonProps>=({title,className,children,handleClick})=>{
    return (
        <button data-test='button-component'title={title} className={className} aria-label={title} onClick={()=>{handleClick()}} >{children}</button>
    )
}
export default Button;