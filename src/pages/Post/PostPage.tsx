import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRouterPost from '../../hoc/withRouterPost';
import { StateType } from '../../redux/redux-store';
import classes from './PostPage.module.css';
import { IPostDataState } from '../../types/postData';
import { getPostData, clearPostDataState } from '../../redux/postData-reducer';
import { addPopup } from '../../redux/popup-reducer';
import SliderImages from './SliderImages/SliderImages';
import AuthorInfo from './AuthorInfo/AuthorInfo';
import PostStatistics from './PostStatistics/PostStatistics';

type PostPageProps = {
  postId: number;

  isAuth: boolean;
  myUserId: number;
  postData: IPostDataState;
  getPostData(postId: number): void;
  clearPostDataState(): void;
  addPopup(contentMessage: string, isSuccessful: boolean): void;
};

const PostPage: React.FC<PostPageProps> = (props) => {
  useEffect(() => {
    props.getPostData(props.postId);
  }, []);
  useEffect(() => {
    return () => {
      props.clearPostDataState();
    };
  }, []);

  return (
    <section className={classes.post_page}>
      <div className={classes.post_wrap}>
        <SliderImages images={props.postData.content} />
        <div className={classes.post_info_wrap}>
          <AuthorInfo
            isFetching={props.postData.isFetching}
            myUserId={props.myUserId}
          />
          <div className={classes.description_comments_block}>
            <div className={classes.description_wrap}>
              {props.postData.description ? (
                props.postData.description
              ) : (
                <i className={classes.no_description}>Описание отсутствует</i>
              )}
            </div>
            <div className={classes.comments_wrap}></div>
          </div>
          <PostStatistics postId={props.postData.id} />
        </div>
      </div>
    </section>
  );
};

let mapSateToProps = (state: StateType) => ({
  postData: state.postData,
  isAuth: state.auth.isAuth,
  myUserId: state.auth.id,
});

export default compose<ComponentType>(
  connect(mapSateToProps, {
    getPostData,
    clearPostDataState,
    addPopup,
  }),
  withRouterPost
)(PostPage);
