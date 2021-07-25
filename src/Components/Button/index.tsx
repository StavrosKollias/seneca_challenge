import React from "react";
import { IButtonProps } from "../../Interfaces/Button/IButton";

const Button: React.FC<IButtonProps> = ({ title, className, children, handleClick, disabled }) => {
    return (
        <button
            data-testid="button-component"
            title={title}
            className={className}
            aria-label={title}
            onClick={() => {
                handleClick();
            }}
            disabled={disabled}>
            {children}
        </button>
    );
};
export default Button;
