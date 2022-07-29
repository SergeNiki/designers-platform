import React, { useEffect, useState } from 'react';
import classes from './ProfileInfo.module.css';
import { IProfileState, RequestForType } from '../../../types/profile';
import { connect } from 'react-redux';
import {
  getUserProfile,
  toggleFollow,
  updateUserAvatar,
} from './../../../redux/profile-reducer';
import { toggleLoginTC } from './../../../redux/auth-reducer';
import UsersModal from '../UsersModal/UsersModal';
import { StateType } from '../../../redux/redux-store';
import UpdateAvatar from './UpdateAvatar/UpdateAvatar';

type ProfileInfoProps = {
  //From Parent
  ownerUserId: number;
  isOwner: boolean;
  isAuth: boolean;

  //From State
  profileData: IProfileState;
  isFetching: boolean;
  getUserProfile(user_id: number): void;
  toggleFollow(user_id: number, request_for: RequestForType): void;
  toggleLoginTC(): void;
  updateUserAvatar(file: any): void;
};

const ProfileInfo = (props: ProfileInfoProps) => {
  useEffect(() => {
    props.getUserProfile(props.ownerUserId);
  }, [props.ownerUserId, props.isAuth, props.profileData.is_followed]);

  useEffect(() => {
    if (!props.isOwner && props.isAuth) {
      props.toggleFollow(props.ownerUserId, 'is_followed');
    }
  }, [props.ownerUserId, props.isAuth]);

  let [usersModalFor, setUsersModalFor] = useState<
    'followers' | 'following' | false
  >(false);

  const usersModalWindow = () => {
    //show modal window with users
    if (usersModalFor) {
      return (
        <UsersModal
          usersModalFor={usersModalFor}
          ownerUserId={props.ownerUserId}
          isAuth={props.isAuth}
          setUsersModalFor={setUsersModalFor}
        />
      );
    }
  };

  let showButtonSub = () => {
    //show subscribe button
    if (!props.isAuth) {
      return (
        <button
          onClick={props.toggleLoginTC}
          style={{ backgroundColor: '#6DEFC0' }}
        >
          Подписаться
        </button>
      );
    } else if (props.isAuth && !props.isOwner) {
      return (
        <button
          disabled={props.isFetching}
          onClick={toggleFollow}
          style={
            props.profileData.is_followed
              ? { backgroundColor: '#C4C4C4' }
              : { backgroundColor: '#6DEFC0' }
          }
        >
          {props.profileData.is_followed ? 'Отписаться' : 'Подписаться'}
        </button>
      );
    }
  };

  const toggleFollow = () => {
    //follow and unfollow action
    if (props.profileData.is_followed) {
      props.toggleFollow(props.ownerUserId, 'unfollow');
    } else {
      props.toggleFollow(props.ownerUserId, 'follow');
    }
  };

  const openModalWindow = (windowFor: 'followers' | 'following') => {
    //open modal window
    if (props.isAuth) {
      if (windowFor == 'followers') {
        setUsersModalFor('followers');
      } else if (windowFor == 'following') {
        setUsersModalFor('following');
      }
    }
  };

  return (
    <div className={classes.info_wrap}>
      <h2>{props.profileData.display_name}</h2>
      {props.isOwner ? (
        <div className={classes.avatar_wrap}>
          <UpdateAvatar
            updateUserAvatar={props.updateUserAvatar}
            srcAvatar={props.profileData.avatar}
          />
        </div>
      ) : (
        <div className={classes.avatar_wrap}>
          <img src={props.profileData.avatar} alt="avatar" />
        </div>
      )}
      <p>@{props.profileData.username}</p>
      <div className={classes.follow_info}>
        <div
          onClick={() => openModalWindow('followers')}
          className={classes.followers}
        >
          <p>Подписчики</p>
          <h2>{props.profileData.followers_count}</h2>
        </div>
        <div
          onClick={() => openModalWindow('following')}
          className={classes.following}
        >
          <p>Подписки</p>
          <h2>{props.profileData.following_count}</h2>
        </div>
      </div>
      <p>{props.profileData.bio}</p>
      <div className={classes.button_wrap}>{showButtonSub()}</div>

      {usersModalWindow()}
    </div>
  );
};

let mapSateToProps = (state: StateType) => ({
  profileData: state.profilePage,
  isFetching: state.profilePage.isFetching,
});

export default connect(mapSateToProps, {
  toggleFollow,
  getUserProfile,
  toggleLoginTC,
  updateUserAvatar,
})(ProfileInfo);
