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

  return (
    <button
      className={`button`}
      onClick={props?.handleClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={
        isHover
          ? {
              ...hoverStyle,
              backgroundColor: props.isDisabled
                ? 'rgb(173, 173, 173)'
                : hoverStyle?.backgroundColor,
              color: props.isDisabled
                ? 'rgb(95, 95, 95)'
                : hoverStyle?.color
            }
          : { ...style }
      }
      disabled={props.isDisabled ? props.isDisabled : false}
    >
      {props.children}
    </button>
  );
};

export default Button;
