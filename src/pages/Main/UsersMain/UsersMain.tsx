import { useEffect } from 'react';
import { connect } from 'react-redux';
import User from '../../../components/User/User';
import { StateType } from '../../../redux/redux-store';
import {
  getUsersList,
  toggleFollow,
  clearState,
} from '../../../redux/users-reducer';
import { RequestForType } from '../../../types/profile';
import { UserDataType } from '../../../types/users';
import classes from './UsersMain.module.css';

type UsersMainProps = {
  isAuth: boolean;

  users: Array<UserDataType>;
  usresOnPageCount: number;
  totalCount: number;
  isFetching: boolean;
  nextUsers: string | null;
  followingsInProgress: Array<number>;
  authUserId: number;
  getUsersList(count: number, page: number): void;
  toggleFollow(id: number, req: RequestForType): void;
  clearState(): void;
};

const UsersMain = (props: UsersMainProps) => {
  useEffect(() => {
    props.getUsersList(10, 1)

    return () => {
        props.clearState()
    }
  }, []);

  const users = props.users.map((user) => (
    <User
      key={user.id}
      {...user}
      isAuth={props.isAuth}
      toggleFollow={props.toggleFollow}
      authUserId={props.authUserId}
      followingsInProgress={props.followingsInProgress}
      handleClickOnUser={() => {}}
    />
  ));

  return <div>{users}</div>;
};

let mapSateToProps = (state: StateType) => ({
  users: state.usersData.users,
  usresOnPageCount: state.usersData.usresOnPageCount,
  totalCount: state.usersData.count,
  isFetching: state.usersData.isFetching,
  nextUsers: state.usersData.next,
  followingsInProgress: state.usersData.followingsInProgress,
  authUserId: state.auth.user_id,
  isAuth: state.auth.isAuth,
});

export default connect(mapSateToProps, {
  getUsersList,
  toggleFollow,
  clearState,
})(UsersMain);
