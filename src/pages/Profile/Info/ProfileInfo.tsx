import { useEffect, useState } from 'react';
import classes from './ProfileInfo.module.css';
import { IProfileState, RequestFollowType } from '../../../types/profile';
import { connect } from 'react-redux';
import { getUserProfile, toggleFollow } from './../../../redux/profile-reducer';
import { toggleLoginTC } from './../../../redux/auth-reducer';
import UsersModal from '../UsersModal/UsersModal';
import { StateType } from '../../../redux/redux-store';
import FollowInfo from './FollowInfo/FollowInfo';
import ButtonFollow from './BattonFollow/ButtonFollow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import ProfileSettings from './ProfileSettings/ProfileSettings';
import UserAvatar from './UserAvatar/UserAvatar';

type ProfileInfoProps = {
  //From Parent
  ownerUserId: number;
  isOwner: boolean;
  isAuth: boolean;

  //From State
  profileData: IProfileState;
  isFetching: boolean;
  getUserProfile(user_id: number): void;
  toggleFollow(user_id: number, request_for: RequestFollowType): void;
  toggleLoginTC(): void;
};

const ProfileInfo = (props: ProfileInfoProps) => {
  useEffect(() => {
    props.getUserProfile(props.ownerUserId);
  }, [props.ownerUserId, props.isAuth, props.profileData.is_followed]);

  useEffect(() => {
    if (!props.isOwner && props.isAuth) {
      props.toggleFollow(props.ownerUserId, 'isFollowed');
    }
  }, [props.ownerUserId, props.isAuth]);

  const [usersModalFor, setUsersModalFor] = useState<
    'followers' | 'following' | false
  >(false);
  const [isSettingsWindow, setIsSettingsWindow] = useState<boolean>(false);

  const usersModalWindow = () => {
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

  return (
    <div className={classes.info_wrap}>
      {props.isAuth && props.isOwner && (
        <div
          className={classes.settings_btn}
          onClick={() => setIsSettingsWindow(true)}
        >
          <FontAwesomeIcon icon={faGear} />
        </div>
      )}
      <div className={classes.display_name_wrap}>
        <h2>{props.profileData.display_name}</h2>
      </div>
      <UserAvatar
        isOwner={props.isOwner}
        srcAvatar={props.profileData.avatar}
      />
      <p>@{props.profileData.username}</p>
      <FollowInfo
        isAuth={props.isAuth}
        followers_count={props.profileData.followers_count}
        following_count={props.profileData.following_count}
        setUsersModalFor={setUsersModalFor}
      />
      <p>{props.profileData.bio}</p>
      <div className={classes.button_wrap}>
        {
          <ButtonFollow
            isFollowed={props.profileData.is_followed}
            isAuth={props.isAuth}
            isOwner={props.isOwner}
            isFetching={props.isFetching}
            ownerUserId={props.ownerUserId}
            toggleFollow={props.toggleFollow}
            toggleLoginTC={props.toggleLoginTC}
          />
        }
      </div>
      {usersModalWindow()}
      {isSettingsWindow && (
        <ProfileSettings
          closeSettingsWindow={setIsSettingsWindow}
          username={props.profileData.username}
          displayName={props.profileData.display_name}
          bio={props.profileData.bio}
        />
      )}
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
})(ProfileInfo);
