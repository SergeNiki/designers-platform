import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { StateType } from '../../../../redux/redux-store';
import classes from './UserAvatar.module.css';
import { checkImage } from '../../../../redux/image-reducer';
import { useEffect, useState } from 'react';
import ConfirmUpdateAvatar from './ConfirmUpdateAvatar/ConfirmUpdateAvatar';

type UserAvatarProps = {
  //from parent
  srcAvatar: string;
  isOwner: boolean;

  //from state
  checkImage(
    event: React.ChangeEvent<HTMLInputElement>,
    maxSize: number,
    isSuccess: React.Dispatch<React.SetStateAction<boolean>>
  ): void;
};

const UserAvatar = (props: UserAvatarProps) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const checkNewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.checkImage(e, 5, setIsUpdate);
  };

  const uploadImage = (e: any) => {
    e.preventDefault();
    let fileInput = document.getElementById(classes.update_avatar_input);
    fileInput?.click();
  };

  if (props.isOwner) {
    return (
      <>
        {isUpdate && (
          <ConfirmUpdateAvatar
            prevAvatar={props.srcAvatar}
            closeWindow={() => setIsUpdate(false)}
          />
        )}
        <div className={classes.avatar_wrap}>
          <div className={classes.popupDiv} onClick={uploadImage}>
            <FontAwesomeIcon icon={faCamera} />
          </div>
          <img
            src={props.srcAvatar}
            className={classes.update_avatar}
            alt="avatar"
          />
          <input
            type="file"
            id={classes.update_avatar_input}
            onChange={checkNewAvatar}
          />
        </div>
      </>
    );
  } else {
    return (
      <div className={classes.avatar_wrap}>
        <img src={props.srcAvatar} alt="avatar" />
      </div>
    );
  }
};

export default connect(() => ({}), {
  checkImage,
})(UserAvatar);
