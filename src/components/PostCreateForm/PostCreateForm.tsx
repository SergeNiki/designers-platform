import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StateType } from '../../redux/redux-store';
import {
  createPost,
  updatePost,
  publishPost,
  clearState,
} from '../../redux/post-reducer';
import { getSubscriptions } from '../../redux/subscriptions-reducer';
import classes from './PostCreateForm.module.css';
import { SubData } from '../../types/subscriptions';
import ImagePreviews from './ImagePreviews/ImagePreviews';
import LevelsSubscriptions from './LevelsSubscriptions/LevelsSubscriptions';
import { UpdatePostRequest } from '../../types/posts';
import DatetimeOfPublication from './DatetimeOfPublication/DatetimeOfPublication';
import Button from '../Button/Button';

type PostCreateFormProps = {
  userId: number;
  postId: number;
  subscriptions: Array<SubData>;
  createPost(): void;
  updatePost(postId: number, data: UpdatePostRequest): void;
  publishPost(postId: number, publicationTime?: Date): void;
  getSubscriptions(userId: number): void;
  clearState(): void;

  closeWindow(): void;
};

const PostCreateForm: React.FC<PostCreateFormProps> = (props) => {
  // States for discription
  const [descriptionText, setDescriptionText] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [isDescriptionValid, setIsDescriptionValid] = useState<boolean>(true);
  // State for files
  const [isFilesValid, setIsFilesValid] = useState<boolean>(false);
  // States for date and time
  const [isDatetimeValid, setIsDatetimeValid] = useState<boolean>(true);
  const [datetimeError, setDatetimeError] = useState<string>('');
  const [selectedDatetime, setSelectedDatetime] = useState<Date>();

  const [isPublishNow, setIsPublishNow] = useState<boolean>(true);

  useEffect(() => {
    props.createPost();
    props.getSubscriptions(props.userId);

    return () => {
      props.clearState();
    };
  }, []);

  const checkSelectedDatetime = (selectedDatetime: Date): boolean => {
    let currDate = new Date();
    let date = currDate.toLocaleString();
    let today = date.slice(0, date.indexOf(','));
    let currHours = currDate.getHours();
    let currMinutes = currDate.getMinutes();
    let errorText = `Дата публикации поста не может быть раньше, чем ${today} в ${currHours}:${currMinutes}`;
    if (selectedDatetime < currDate) {
      setIsDatetimeValid(false);
      setDatetimeError(errorText);
      return false;
    } else {
      setIsDatetimeValid(true);
      setDatetimeError('');
      setSelectedDatetime(selectedDatetime);
      return true;
    }
  };

  const descriptionHendler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionText(e.currentTarget.value);
    if (e.currentTarget.value.length > 2000) {
      setDescriptionError('Текст поста не может превышать 2000 символов!');
      setIsDescriptionValid(false);
    } else {
      setDescriptionError('');
      setIsDescriptionValid(true);
    }
  };

  const updateDescription = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (descriptionText && isDescriptionValid) {
      props.updatePost(props.postId, { description: descriptionText });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPublishNow) {
      props.publishPost(props.postId);
      props.closeWindow();
    } else {
      if (checkSelectedDatetime(selectedDatetime!)) {
        props.publishPost(props.postId, selectedDatetime);
        props.closeWindow();
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <div className={classes.description_wrap}>
        <label htmlFor={classes.post_description}>Введите текст поста</label>
        <textarea
          name='postDescription'
          id={classes.post_description}
          placeholder='текст'
          value={descriptionText}
          onChange={descriptionHendler}
          onBlur={updateDescription}
        />
        <p className={classes.error_message}>{descriptionError}</p>
      </div>
      <ImagePreviews postId={props.postId} setIsValid={setIsFilesValid} />
      <LevelsSubscriptions
        postId={props.postId}
        subscriptions={props.subscriptions}
        updatePost={props.updatePost}
      />
      <DatetimeOfPublication
        errorMessage={datetimeError}
        setIsPublishNow={setIsPublishNow}
        setIsValid={setIsDatetimeValid}
        checkSelectedDatetime={checkSelectedDatetime}
      />
      <div className={classes.btn_wrap}>
        <Button
          styles={{
            backgroundColor: '#f0f0f0',
            width: '180px',
            height: '35px',
          }}
          isDisabled={
            !isDescriptionValid ||
            !isFilesValid ||
            (!isDatetimeValid && !isPublishNow)
          }
          hoverStyles={{ backgroundColor: 'var(--main-button-color)' }}>
          Опубликовать
        </Button>
      </div>
    </form>
  );
};

let mapSateToProps = (state: StateType) => ({
  userId: state.auth.id,
  postId: state.postData.id,
  subscriptions: state.subscriptionsData.results,
});

export default connect(mapSateToProps, {
  createPost,
  updatePost,
  getSubscriptions,
  publishPost,
  clearState,
})(PostCreateForm);
