import { useEffect, useState } from 'react';
import classes from './ProfileInfo.module.css';
import { IProfileState, RequestFollowType } from '../../../types/profile';
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
import FollowInfo from './FollowInfo/FollowInfo';
import ButtonFollow from './BattonFollow/ButtonFollow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import ProfileSettings from './ProfileSettings/ProfileSettings';

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
  updateUserAvatar(file: any): void;
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

  //show modal window with users
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
      <div
        className={classes.settings_btn}
        onClick={() => setIsSettingsWindow(true)}
      >
        <FontAwesomeIcon icon={faGear} />
      </div>
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
        <ProfileSettings closeSettingsWindow={setIsSettingsWindow} />
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
  updateUserAvatar,
})(ProfileInfo);
