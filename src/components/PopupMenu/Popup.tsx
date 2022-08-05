import { useMemo } from 'react';
import { connect } from 'react-redux';
import { StateType } from '../../redux/redux-store';
import { PopupData } from '../../types/popupMenu';
import { removePopup, startTimer } from '../../redux/popup-reducer';
import classes from './Popup.module.css';
import PopupMenu from './PopupItem/PopupItem';

type PopupProps = {
  popups: Array<PopupData>;
  removePopup(): void;
  startTimer(id: number): void
};

const Popup = (props: PopupProps) => {
  const popups = useMemo(
    () =>
      props.popups.map((popup) => (
        <PopupMenu
          key={popup.id}
          popupData={popup}
          removePopup={props.removePopup}
          startTimer={props.startTimer}
        />
      )),
    [props.popups.length]
  );
  return <div className={classes.popups_wrap}>{popups}</div>;
};

let mapStateToProps = (state: StateType) => ({
  popups: state.popupMenu.popups,
});

export default connect(mapStateToProps, {
  removePopup,
  startTimer
})(Popup);
