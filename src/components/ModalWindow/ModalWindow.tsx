import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import classes from './ModalWindow.module.css';

type ModalWindowProps = {
  children: React.ReactNode;
  closeWindow(value: false): void;
};

const ModalWindow = (props: ModalWindowProps) => {
  useEffect(() => {
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    return () => {
      document.getElementsByTagName('body')[0].style.overflowY = 'auto';
    };
  }, []);
  return (
    <div className={classes.modal_wrap} onClick={() => props.closeWindow(false)} >
      <div className={classes.modal_window} onClick={(e) => e.stopPropagation()} >
        <div className={classes.close_btn}>
          <FontAwesomeIcon icon={faXmark} onClick={() => props.closeWindow(false)} />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default ModalWindow;