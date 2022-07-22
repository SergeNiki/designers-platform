import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import classes from './UpdateAvatar.module.css';

type UpdateAvatarProps = {
  srcAvatar: string;
  updateUserAvatar(file: any): void;
};

const UpdateAvatar = (props: UpdateAvatarProps) => {
  const [popupDivCoords, setPopupDivCoords] = useState<string>('blur(0px)');

  const updateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    //user avatar update
    if (e.currentTarget.files?.length) {
      const file = e.currentTarget.files[0];
      if (file.type == 'image/jpeg') {
        props.updateUserAvatar(file);
      } else {
        alert('Неподходящий тип или формат файла!');
      }
    }
  };

  const onUploadImage = (e: any) => {
    e.preventDefault()
    let fileInput = document.getElementById('update_avatar_input')
    fileInput?.click()
  }

  return (
    <>
      <div
        className={classes.popupDiv}
        onClick={onUploadImage}
      >
        <FontAwesomeIcon icon={faCamera} />
      </div>
      <img
        src={props.srcAvatar}
        className={classes.update_avatar}
        alt="avatar"
      />
      <input
        type="file"
        id='update_avatar_input'
        onChange={updateAvatar}
        className={classes.input_update_avatar}
      />
    </>
  );
};

export default UpdateAvatar;
