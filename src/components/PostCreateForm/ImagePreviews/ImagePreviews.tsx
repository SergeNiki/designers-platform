import { connect } from 'react-redux';
import { StateType } from '../../../redux/redux-store';
import { addImageFile, removeImageFile } from '../../../redux/post-reducer';
import classes from './ImagePreviews.module.css';
import { ImageFileData } from '../../../types/posts';
import Button from '../../Button/Button';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type ImagePreviewsProps = {
  postId: number;
  setIsValid(isValid: boolean): void;

  images: Array<ImageFileData>;
  isFetching: boolean;
  addImageFile(postId: number, imageFile: File): void;
  removeImageFile(postId: number, imageId: number): void;
};

const ImagePreviews: React.FC<ImagePreviewsProps> = (props) => {
  useEffect(() => {
    if (props.images.length == 0) {
      props.setIsValid(false);
    } else props.setIsValid(true);
  }, [props.images]);

  const previews = props.images.map((image) => {
    return (
      <div className={classes.preview_wrap}>
        <div className={classes.close_btn}>
          <FontAwesomeIcon
            icon={faXmark}
            style={{ height: '20px', width: '20px' }}
            onClick={() => props.removeImageFile(props.postId, image.id)}
          />
        </div>
        <img key={image.id} src={image.file} className={classes.preview} />
      </div>
    );
  });

  const uploadImage = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let fileInput = document.getElementById(classes.post_preview);
    fileInput?.click();
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    for (let i = 0; i < files!.length; i++) {
      props.addImageFile(props.postId, files![i]);
    }
    e.target.value = '';
  };

  return (
    <div className={classes.image_previews}>
      <input
        id={classes.post_preview}
        type='file'
        onChange={handleImageFile}
        multiple
      />
      <div className={classes.previews_wrap}>{previews}</div>
      <div className={classes.btn_wrap}>
        <Button
          styles={{
            backgroundColor: '#f0f0f0',
            width: '180px',
            height: '35px',
          }}
          hoverStyles={{ backgroundColor: 'var(--main-button-color)' }}
          handleClick={uploadImage}>
          Добавить файл
        </Button>
      </div>
    </div>
  );
};

let mapSateToProps = (state: StateType) => ({
  images: state.postData.content,
  isFetching: state.postData.isFetching,
});

export default connect(mapSateToProps, {
  addImageFile,
  removeImageFile,
})(ImagePreviews);
