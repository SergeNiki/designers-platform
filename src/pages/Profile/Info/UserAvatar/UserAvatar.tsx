import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { StateType } from '../../../../redux/redux-store';
import classes from './UserAvatar.module.css';
import { checkImage, clearImageState } from '../../../../redux/image-reducer';
import { updateUserAvatar } from '../../../../redux/profile-reducer';
import { useEffect, useState } from 'react';

type UserAvatarProps = {
  //from parent
  srcAvatar: string;
  isOwner: boolean;

  //from state
  imageFile: File | null;
  coverPreview: string;
  updateUserAvatar(file: File): void;
  checkImage(
    event: React.ChangeEvent<HTMLInputElement>,
    isSuccess: React.Dispatch<React.SetStateAction<boolean>>
  ): void;
  clearImageState(): void;
};

const UserAvatar = (props: UserAvatarProps) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  useEffect(() => {
    if (isUpdate && props.imageFile) {
      props.updateUserAvatar(props.imageFile);
      props.clearImageState();
      setIsUpdate(false);
    }
  }, [props.imageFile, isUpdate]);
  const updateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.checkImage(e, setIsUpdate);
  };

  const uploadImage = (e: any) => {
    e.preventDefault();
    let fileInput = document.getElementById(classes.update_avatar_input);
    fileInput?.click();
  };

  if (props.isOwner) {
    return (
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
          onChange={updateAvatar}
        />
      </div>
    );
  } else {
    return (
      <div className={classes.avatar_wrap}>
        <img src={props.srcAvatar} alt="avatar" />
      </div>
    );
  }
};

let mapSateToProps = (state: StateType) => ({
  imageFile: state.image.imageFile,
  coverPreview: state.image.coverPreview,
});

export default connect(mapSateToProps, {
  updateUserAvatar,
  checkImage,
  clearImageState,
})(UserAvatar);
