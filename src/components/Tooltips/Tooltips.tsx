import { CSSProperties, useEffect, useState } from 'react';
import classes from './Tooltips.module.css';

type TooltipsProps = {
  children?: string;
  orientation: 'horizontal' | 'vertical';
  styles?: CSSProperties
};

const Tooltips: React.FC<TooltipsProps> = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    let timer = setTimeout(async () => {
      setIsVisible(true);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  if (isVisible)
    return (
      <div
        className={`${classes.tooltip} ${classes[props.orientation]}`}
        style={props.styles}
      >
        {props.children}
      </div>
    );
  else return <></>;
};

export default Tooltips;
