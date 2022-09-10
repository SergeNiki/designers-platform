import { useEffect, useState } from 'react';
import { PopupData } from '../../../types/popupMenu';
import classes from './PopupItem.module.css';

type PopupItemProps = {
  popupData: PopupData;
  removePopup(): void;
  startTimer(id: number): void;
};

const PopupItem = (props: PopupItemProps) => {
  const [opacity, setOpacity] = useState<number>(
    props.popupData.isTimerStarted ? 1 : 0
  );
  useEffect(() => {
    if (!props.popupData.isTimerStarted) {
      setOpacity(1);
      props.startTimer(props.popupData.id);
      setTimeout(async () => {
        setOpacity(0);
        setTimeout(() => {
          props.removePopup();
        }, 2000);
      }, 5000);
    }
  }, []);
  return (
    <div
      className={classes.popup_menu}
      style={{
        opacity: opacity,
        color: props.popupData.isSuccessful ? 'white' : '#ff342c',
      }}
    >
      {props.popupData.contentMessage}
    </div>
  );
};

export default PopupItem;
