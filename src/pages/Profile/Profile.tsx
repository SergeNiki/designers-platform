import React, { ComponentType, useEffect } from "react";
import { connect } from "react-redux";
import { IProfileState } from "../../types/profile";
import { StateType } from "../../types/state";
import Albums from "./Albums/Albums";
import ProfileInfo from "./Info/ProfileInfo";
import ProfileMenu from "./Menu/ProfileMenu";
import ProfilePosts from "./Posts/ProfilePosts";
import classes from "./Profile.module.css";
import SubTypes from "./SubTypes/SubTypes";
import withRouterProfile from "./../../hoc/withRouterProfile"
import { compose } from "redux";

export type ProfileProps = {
  authUserId: number | null;
  ownerUserId: number;
  isOwner: boolean;
  isAuth: boolean;
};

const Profile: React.FC<ProfileProps> = (props) => {

  type ContentType = "posts" | "sub_types" | "albums"
  let [contentType, setContentType] = React.useState<ContentType>("posts");

  let contentTypeComponent = () => {
    switch (contentType) {
      case "posts":
        return <ProfilePosts/>
      case "albums":
        return <Albums/>
      case "sub_types":
        return <SubTypes/>
    }
  }

  return (
    <section id="profile">
      <div className={classes.profile_wrap}>
        <ProfileInfo ownerUserId={props.ownerUserId} isOwner={props.isOwner} isAuth={props.isAuth} />
        <ProfileMenu contentType={contentType} setContentType={setContentType} />
        {contentTypeComponent()}
      </div>
    </section>
  );
};

let mapSateToProps = (state: StateType) => ({
  authUserId: state.auth.user_id,
  isAuth: state.auth.isAuth
})


export default compose<ComponentType>(
  connect(mapSateToProps),
  withRouterProfile
)(Profile)
