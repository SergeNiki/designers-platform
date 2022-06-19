import React from "react";
import { connect } from "react-redux";
import Preview from "../../../components/Preview/Preview";
import { PreviewDataType } from "../../../types/posts";
import { StateType } from "../../../types/state";
import classes from "./ProfilePosts.module.css";

type ProfilePostsProps = {
  postsArray: Array<PreviewDataType>;
};

const ProfilePosts: React.FC<ProfilePostsProps> = (props) => {
  const posts = props.postsArray.map((post: PreviewDataType, key: number) => (
    <Preview key={key} id={post.id} imageSrc={post.preview} likesCount={post.likesCount} />
  ));

  return (
    <div className={classes.posts_wrap}>
      <div className={classes.posts}>{posts}</div>
    </div>
  );
};

let mapSateToProps = (state: StateType) => ({
  postsArray: state.postPreviews.postPreviewsArray,
});

export default connect(mapSateToProps)(ProfilePosts);
