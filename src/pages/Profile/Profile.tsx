import React, { ComponentType } from "react";
import { connect } from "react-redux";
import Albums from "./Albums/Albums";
import ProfileInfo from "./Info/ProfileInfo";
import ProfileMenu from "./Menu/ProfileMenu";
import ProfilePosts from "./Posts/ProfilePosts";
import classes from "./Profile.module.css";
import Subscriptions from "./Subscriptions/Subscriptions";
import withRouterProfile from "./../../hoc/withRouterProfile"
import { compose } from "redux";
import { StateType } from "../../redux/redux-store";

export type ProfileProps = {
  authUserId: number | null;
  ownerUserId: number;
  isOwner: boolean;
  isAuth: boolean;
};

const Profile: React.FC<ProfileProps> = (props) => {

  type ContentType = "посты" | "виды подписок" | "альбомы"
  let [contentType, setContentType] = React.useState<ContentType>("посты");

  let contentTypeComponent = () => {
    switch (contentType) {
      case "посты":
        return <ProfilePosts isOwner={props.isOwner} ownerUserId={props.ownerUserId} />
      case "альбомы":
        return <Albums/>
      case "виды подписок":
        return <Subscriptions isOwner={props.isOwner} ownerUserId={props.ownerUserId} />
    }
  }

  return (
    <section id="profile">
      <div className={classes.profile_wrap}>
        <ProfileInfo ownerUserId={props.ownerUserId} isOwner={props.isOwner} isAuth={props.isAuth} />
        <ProfileMenu contentType={contentType} setContentType={setContentType} />
        <div className={classes.profile_content} >
          {contentTypeComponent()}
        </div>
      </div>
    </section>
  );
};

let mapSateToProps = (state: StateType) => ({
  authUserId: state.auth.id,
  isAuth: state.auth.isAuth
})


export default compose<ComponentType>(
  connect(mapSateToProps),
  withRouterProfile
)(Profile)
