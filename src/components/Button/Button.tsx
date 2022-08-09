import { CSSProperties, useEffect, useState } from 'react';
import './Button.css';

type ButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  styles?: CSSProperties;
  hoverStyles?: CSSProperties;
  handleClick?(e: any): void;
};

const Button = (props: ButtonProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  let style = { ...props.styles };
  let hoverStyle = { ...style, ...props.hoverStyles };

  const onMouseOver = () => {
    setIsHover(true);
  };
  const onMouseOut = () => {
    setIsHover(false);
  };

  const stylesForDisabled: CSSProperties = {
    backgroundColor: 'rgb(173, 173, 173)',
    color: 'rgb(95, 95, 95)',
  };

  return (
    <button
      className={`button`}
      onClick={props?.handleClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={
        props.isDisabled ? {...style, ...stylesForDisabled}
        : isHover
          ? {...hoverStyle}
          : {...style}
      }
      disabled={props.isDisabled ? props.isDisabled : false}
    >
      {props.children}
    </button>
  );
};

export default Button;
