import { useState } from 'react';
import Button from '../../Button/Button';
import classes from './SubCoverDownload.module.css'


type SubCoverDownloadProps = {
    coverPreview: string
    checkImage(
        event: React.ChangeEvent<HTMLInputElement>,
        maxSize: number,
        isSuccess: React.Dispatch<React.SetStateAction<boolean>>
      ): void;
}

const SubCoverDownload = (props: SubCoverDownloadProps) => {
    const [isLoadImage, setIsLoadImage] = useState<boolean>(false);

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <input id={classes.sub_cover_preview} type="file" onChange={handleImageFile} />
      {props.coverPreview && isLoadImage ? (
        <img
          src={props.coverPreview}
          alt="обложка"
          className={classes.cover_preview}
        />
      ) : (
        <></>
      )}
      <Button
        isDisabled={false}
        styles={{'backgroundColor': '#f0f0f0', 'width': '180px', 'height': '35px'}}
        hoverStyles={{'backgroundColor': '#67c598'}}
        handleClick={uploadImage}
      >
        {props.coverPreview ? 'Изменить' : 'Добавить обложку'}
      </Button>
    </>
    )
} 

export default SubCoverDownload