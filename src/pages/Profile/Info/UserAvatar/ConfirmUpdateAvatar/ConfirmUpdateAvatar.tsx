import { connect } from 'react-redux';
import ConfirmWindow from '../../../../../components/ConfirmWindow/ConfirmWindow';
import { StateType } from '../../../../../redux/redux-store';
import { clearImageState } from '../../../../../redux/image-reducer';
import { updateUserAvatar } from '../../../../../redux/profile-reducer';
import classes from './ConfirmUpdateAvatar.module.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

type ConfirmUpdateAvatarProps = {
  //from parent
  prevAvatar: string;
  closeWindow(): void;

  //from state
  imageFile: File;
  newAvatar: string;
  updateUserAvatar(file: File): void;
  clearImageState(): void;
};

const ConfirmUpdateAvatar: React.FC<ConfirmUpdateAvatarProps> = (props) => {
  useEffect(() => {
    return () => {
      props.clearImageState();
    };
  }, []);

  const updateAvatar = () => {
    props.updateUserAvatar(props.imageFile);
    props.clearImageState();
    props.closeWindow();
  };

  const confirmHeader = <h2>Обновление аватара</h2>;

  return (
    <ConfirmWindow
      closeWindow={props.closeWindow}
      header={confirmHeader}
      handleClick={updateAvatar}
      confirmTextBtn="Обновить"
    >
      <div className={classes.confirm_avatar}>
        <div className={classes.avatar_wrap}>
          <img src={props.prevAvatar} alt="" />
        </div>
        <div className={classes.icon_angles}>
            <FontAwesomeIcon icon={faAnglesRight}/>
        </div>
        <div className={classes.avatar_wrap}>
            <img src={props.newAvatar} alt="" />
        </div>
      </div>
    </ConfirmWindow>
  );
};

let mapSateToProps = (state: StateType) => ({
  imageFile: state.image.imageFile,
  newAvatar: state.image.imagePreview,
});

export default connect(mapSateToProps, {
  updateUserAvatar,
  clearImageState,
})(ConfirmUpdateAvatar);
