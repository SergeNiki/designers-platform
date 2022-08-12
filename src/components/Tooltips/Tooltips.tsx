import { CSSProperties, useEffect, useState } from 'react';
import classes from './Tooltips.module.css';

type TooltipsProps = {
  children?: string;
  orientation: 'horizontal' | 'vertical';
  styles?: CSSProperties
};

const Tooltips: React.FC<TooltipsProps> = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(0)
  useEffect(() => {
    let timer = setTimeout(async () => {
      setIsVisible(true);
      setTimeout(async () => {
        setOpacity(1)
      }, 100)
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  if (isVisible)
    return (
      <div
        className={`${classes.tooltip} ${classes[props.orientation]}`}
        style={{...props.styles, opacity: opacity}}
      >
        {props.children}
      </div>
    );
  else return <></>;
};

export default Tooltips;
