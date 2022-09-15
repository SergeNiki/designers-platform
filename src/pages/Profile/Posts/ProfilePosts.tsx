import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Preview from '../../../components/Preview/Preview';
import { StateType } from '../../../redux/redux-store';
// import { PreviewDataType } from "../../../types/postCreating";
import {
  getAuthPostsList,
  getUserPostsList,
} from '../../../redux/postLists-reducer';
import classes from './ProfilePosts.module.css';
import { PostPreviewData, PostsStatus } from '../../../types/postsList';

type ProfilePostsProps = {
  isOwner: boolean;
  ownerUserId: number;

  publishedPosts: Array<PostPreviewData> | undefined;
  getAuthPostsList(status: PostsStatus): void;
  getUserPostsList(id: number): void;
};

const ProfilePosts: React.FC<ProfilePostsProps> = (props) => {
  useEffect(() => {
    props.isOwner
      ? props.getAuthPostsList(PostsStatus.PUBLISHED)
      : props.getUserPostsList(props.ownerUserId);
  }, [props.ownerUserId, props.isOwner]);

  let posts = props.publishedPosts?.map((post: PostPreviewData) => (
    <Preview
      key={post.id}
      previewData={post}
      isOwner={props.isOwner}
    />
  ));
 
  return <div className={classes.posts_wrap}>{posts}</div>;
};

let mapStateToProps = (state: StateType) => ({
  publishedPosts: state.postLists.publishedPosts?.results,
});

export default connect(mapStateToProps, {
  getAuthPostsList,
  getUserPostsList,
})(ProfilePosts);
