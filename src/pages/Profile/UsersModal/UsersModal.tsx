import { connect } from 'react-redux';
import {
  getUsersList,
  getFollowUsersList,
  toggleFollow,
  clearState,
} from '../../../redux/users-reducer';
import { useEffect, useMemo } from 'react';
import { FollowUsersRequest, UserDataType } from '../../../types/users';
import User from '../../../components/User/User';
import classes from './UsersModal.module.css';
import { RequestFollowType } from '../../../types/profile';
import { StateType } from '../../../redux/redux-store';
import ModalWindow from '../../../components/ModalWindow/ModalWindow';
import UsersModalMenu from './UsersModalMenu/UsersModalMenu';

type UsersModalProps = {
  //From Parent
  usersModalFor: 'followers' | 'following' | false;
  ownerUserId: number;
  isAuth: boolean;
  setUsersModalFor(value: 'followers' | 'following' | false): void;

  //From State
  users: Array<UserDataType>;
  usresOnPageCount: number;
  totalCount: number;
  isFetching: boolean;
  nextUsers: string | null;
  followingsInProgress: Array<number>;
  authUserId: number;
  getUsersList(count: number, page: number): void;
  getFollowUsersList(data: FollowUsersRequest): void;
  toggleFollow(id: number, req: RequestFollowType): void;
  clearState(): void;
};

const UsersModal = (props: UsersModalProps) => {
  useEffect(() => {
    if (props.usersModalFor) {
      props.getFollowUsersList({
        id: props.ownerUserId,
        requestFor: props.usersModalFor,
      });
    }
  }, [props.usersModalFor]);

  useEffect(() => {
    return () => {
      props.clearState();
    };
  }, [props.usersModalFor]);

  const showMoreUsers = (): void => {
    if (props.usersModalFor) {
      props.getFollowUsersList({
        id: props.ownerUserId,
        requestFor: props.usersModalFor,
        next: props.nextUsers,
      });
    }
  };

  const followersOrFollowing = props.users.map((user) => (
    <User
      key={user.id}
      {...user}
      isAuth={props.isAuth}
      toggleFollow={props.toggleFollow}
      authUserId={props.authUserId}
      followingsInProgress={props.followingsInProgress}
      handleClickOnUser={props.setUsersModalFor}
    />
  ));

  let header = (
    <UsersModalMenu
      usersModalFor={props.usersModalFor}
      setUsersModalFor={props.setUsersModalFor}
    />
  );

  return (
    <ModalWindow
      closeWindow={() => props.setUsersModalFor(false)}
      header={header}
      styles={{ width: '768px' }}>
      <div className={classes.users_list_wrap}>
        <div className={classes.users_list}>{followersOrFollowing}</div>
        {typeof props.nextUsers == 'string' && (
          <div className={classes.show_more_btn_wrap}>
            <button onClick={showMoreUsers}>Показать ещё</button>
          </div>
        )}
      </div>
    </ModalWindow>
  );
};

let mapSateToProps = (state: StateType) => ({
  users: state.usersData.users,
  usresOnPageCount: state.usersData.usresOnPageCount,
  totalCount: state.usersData.count,
  isFetching: state.usersData.isFetching,
  nextUsers: state.usersData.next,
  followingsInProgress: state.usersData.followingsInProgress,
  authUserId: state.auth.id,
});

export default connect(mapSateToProps, {
  getUsersList,
  getFollowUsersList,
  toggleFollow,
  clearState,
})(UsersModal);
