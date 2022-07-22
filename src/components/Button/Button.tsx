import { useState } from 'react';
import './Button.css';

type ButtonProps = {
  children: React.ReactNode;
  isDisabled: boolean;
  backgroundColor: string;
  hoverBackgroundColor: string;
  buttonSize: 'small' | 'medium' | 'large'
  handleClick(e: any): void;
};

const Button = (props: ButtonProps) => {
  const [color, setColor] = useState<string>(props.backgroundColor);
  const onMouseOver = () => {
    setColor(props.hoverBackgroundColor);
  };
  const onMouseOut = () => {
    setColor(props.backgroundColor);
  };

  return (
    <button
      className={`button button_${props.buttonSize}`}
      onClick={props.handleClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{ backgroundColor: color }}
    >
      {props.children}
    </button>
  );
};

export default Button;
