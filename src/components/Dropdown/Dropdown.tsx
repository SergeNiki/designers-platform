import { CSSProperties, useEffect, useState } from 'react';
import classes from './Dropdown.module.css';

type DropdownProps = {
  children?: React.ReactNode;
  coordsData: DOMRect;
  closeDropdownMwnu(): void;
};

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [styles, setStyles] = useState<CSSProperties>({
    top: props.coordsData.bottom + 'px',
    right: window.innerWidth - props.coordsData.right + 'px',
  });

  useEffect(() => {
    let top: string;
    if (props.coordsData.bottom <= 55) {
      top = String('55px');
    } else {
      top = String(props.coordsData.bottom + 'px');
    }
    setStyles({ ...styles, top: top });
  }, [props.coordsData]);

  return (
    <>
      <div
        className={classes.dropdown_wrap}
        onClick={props.closeDropdownMwnu}
        onTouchStart={props.closeDropdownMwnu}
      ></div>
      <div className={classes.dropdown_menu} style={{ ...styles }}>
        {props.children}
      </div>
    </>
  );
};

export default Dropdown;
