import { useEffect, useState } from 'react';
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
  const [bgColor, setBgColor] = useState<string>('');

  useEffect(() => {
    setBgColor(props.backgroundColor)
}, [props.backgroundColor])

  const onMouseOver = () => {
    setBgColor(props.hoverBackgroundColor);
  };
  const onMouseOut = () => {
    setBgColor(props.backgroundColor);
  };

  return (
    <button
      className={`button button_${props.buttonSize}`}
      onClick={props.handleClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{ backgroundColor: props.isDisabled ? "#C5D6CA" : bgColor }}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
