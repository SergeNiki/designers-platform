import React from "react";
import { connect } from "react-redux";
import Preview from "../../../components/Preview/Preview";
import { StateType } from "../../../redux/redux-store";
import { PreviewDataType } from "../../../types/posts";
import classes from "./ProfilePosts.module.css";

type ProfilePostsProps = {
  postsArray: Array<PreviewDataType>;
};

const ProfilePosts: React.FC<ProfilePostsProps> = (props) => {
  const posts = props.postsArray.map((post: PreviewDataType, key: number) => (
    <Preview key={key} id={post.id} imageSrc={post.preview} likesCount={post.likesCount} />
  ));

  return (
      <div className={classes.posts_wrap}>{posts}</div>
  );
};

let mapStateToProps = (state: StateType) => ({
  postsArray: state.postPreviews.postPreviewsArray,
});

export default connect(mapStateToProps)(ProfilePosts);
