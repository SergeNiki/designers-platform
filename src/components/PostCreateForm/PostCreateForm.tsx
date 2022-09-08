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
import DateTimeOfPublication from './DateTimeOfPublication/DateTimeOfPublication';
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
};

const PostCreateForm: React.FC<PostCreateFormProps> = (props) => {
  useEffect(() => {
    props.createPost();
    props.getSubscriptions(props.userId);

    return () => {
      props.clearState();
    };
  }, []);

  const [descriptionText, setDescriptionText] = useState<string>('')
  const [isDescriptionValid, setIsDescriptionValid] = useState<boolean>(true);
  const [descriptionError, setDescriptionError] = useState<string>('')
  const [isFilesValid, setIsFilesValid] = useState<boolean>(false);

  const descriptionHendler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionText(e.currentTarget.value)
    if (e.currentTarget.value.length > 2000) {
      setDescriptionError('Текст поста не может превышать 2000 символов!')
      setIsDescriptionValid(false)
    } else {
      setDescriptionError('')
      setIsDescriptionValid(true)
    }
  }

  const updateDescription = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (descriptionText && isDescriptionValid) {
      props.updatePost(props.postId, {description: descriptionText})
    }
  }

  const onSubmit = () => {
    //   props.publishPost()
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
      <DateTimeOfPublication />
      <div className={classes.btn_wrap}>
        <Button
          styles={{
            backgroundColor: '#f0f0f0',
            width: '180px',
            height: '35px',
          }}
          isDisabled={!isDescriptionValid || !isFilesValid}
          hoverStyles={{ backgroundColor: 'var(--main-button-color)' }}
          >
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
