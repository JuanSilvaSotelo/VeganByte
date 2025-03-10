import React from 'react';

function Button({ children, ...props }) {
    return (
        <button className="login-button" {...props}>
            {children}
        </button>
    );
}

export default Button;