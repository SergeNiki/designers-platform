import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, useEffect } from 'react';
import ModalHeader from './ModalHeader/ModalHeader';
import classes from './ModalWindow.module.css';

type ModalWindowProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  styles?: CSSProperties
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
    <div
      className={classes.modal_wrap}
      onClick={() => props.closeWindow(false)}
    >
      <div
        className={classes.modal_window}
        style={props?.styles}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <ModalHeader>{props.header}</ModalHeader>
        <div className={classes.close_btn}>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => props.closeWindow(false)}
          />
        </div>
        <div className={classes.modal_content}>{props.children}</div>
      </div>
    </div>
  );
};

export default ModalWindow;
