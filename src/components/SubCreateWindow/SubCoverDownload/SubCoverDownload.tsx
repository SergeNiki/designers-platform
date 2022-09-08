import { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import classes from './SubCoverDownload.module.css';

type SubCoverDownloadProps = {
  coverPreview: string;
  defaultCoverPreview?: string;
  checkImage(
    event: React.ChangeEvent<HTMLInputElement>,
    maxSize: number,
    isSuccess: React.Dispatch<React.SetStateAction<boolean>>
  ): void;
};

const SubCoverDownload = (props: SubCoverDownloadProps) => {
  const [isLoadImage, setIsLoadImage] = useState<boolean>(false);
  const [currCoverPreview, setCurrCoverPreview] = useState<string>('');
  useEffect(() => {
    if (props.defaultCoverPreview && !props.coverPreview) {
      setIsLoadImage(true);
      setCurrCoverPreview(props.defaultCoverPreview);
    } else if (props.coverPreview) {
      setIsLoadImage(true);
      setCurrCoverPreview(props.coverPreview);
    }
  }, [props.defaultCoverPreview, props.coverPreview]);

  useEffect(() => {
    return () => setIsLoadImage(false);
  }, []);

  const uploadImage = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let fileInput = document.getElementById(classes.sub_cover_preview);
    fileInput?.click();
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.checkImage(e, 8, setIsLoadImage);
  };

  return (
    <>
      <label>Обложка подписки</label>
      <input
        id={classes.sub_cover_preview}
        type='file'
        onChange={handleImageFile}
      />
      {isLoadImage ? (
        <img
          src={currCoverPreview}
          alt='обложка'
          className={classes.cover_preview}
        />
      ) : (
        <></>
      )}
      <Button
        styles={{ backgroundColor: '#f0f0f0', width: '180px', height: '35px' }}
        hoverStyles={{ backgroundColor: 'var(--main-button-color)' }}
        handleClick={uploadImage}>
        {currCoverPreview ? 'Изменить' : 'Добавить обложку'}
      </Button>
    </>
  );
};

export default SubCoverDownload;
