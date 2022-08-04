import { useEffect, useState } from 'react';
import './Button.css';

type ButtonProps = {
  children: React.ReactNode;
  isDisabled: boolean;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  buttonSize: 'small' | 'medium' | 'large'
  handleClick?(e: any): void;
};

const Button = (props: ButtonProps) => {
  const [bgColor, setBgColor] = useState<string>('#6DEFC0');

  useEffect(() => {
    if (props.backgroundColor) setBgColor(props.backgroundColor)
}, [props.backgroundColor])

  const onMouseOver = () => {
    if (props.hoverBackgroundColor) setBgColor(props.hoverBackgroundColor);
  };
  const onMouseOut = () => {
    setBgColor(props.backgroundColor ? props.backgroundColor : '#6DEFC0');
  };

  return (
    <button
      className={`button button_${props.buttonSize}`}
      onClick={props?.handleClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{ backgroundColor: !props.isDisabled ? bgColor : "#C5D6CA" }}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
