import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StateType } from '../../redux/redux-store';
import { closePopupMenu } from "./../../redux/popupMenu-reducer"
import classes from './PopupMenu.module.css';

type PopupMenuProps = {
  message: string;
  isSuccessful: boolean;
  closePopupMenu(): void
};

const PopupMenu = (props: PopupMenuProps) => {
    const [opacity, setOpacity] = useState<number>(0)
    useEffect(() => {
        setOpacity(1)
        setTimeout(async () => {
            setOpacity(0)
            setTimeout(() => {
                props.closePopupMenu();
            }, 2000)
        }, 5000)
        return () => {
            props.closePopupMenu()
        }
    }, [])
  return (
    <div
      className={classes.popup_wrap}
      style={{ opacity: opacity, backgroundColor: props.isSuccessful ? '#78E1AF' : '#ff342c' }}
    >
      {props.message}
    </div>
  );
};

let mapStateToProps = (state: StateType) => ({
  message: state.popupMenu.contentMessage,
  isSuccessful: state.popupMenu.isSuccessful,
});

export default connect(mapStateToProps, {
    closePopupMenu
})(PopupMenu);
