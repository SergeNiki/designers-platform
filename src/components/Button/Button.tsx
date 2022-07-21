import { useState } from 'react';
import classes from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  isDisabled: boolean;
  backgroundColor: string;
  hoverBackgroundColor: string;
  width: string;
  handleClick(): void;
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
      className={classes.button}
      onClick={props.handleClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{ backgroundColor: color, width: props.width }}
    >
      {props.children}
    </button>
  );
};

export default Button;
