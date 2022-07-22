import { connect } from "react-redux";
import {
  getUsersList,
  getFollowersList,
  getFollowingList,
  toggleFollow,
  clearState,
} from "../../../redux/users-reducer";
import { useEffect } from "react";
import { UserDataType } from "../../../types/users";
import User from "../../../components/User/User";
import classes from "./UsersModal.module.css";
import { RequestForType } from "../../../types/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { StateType } from "../../../redux/redux-store";

type UsersModalProps = {
  //From Parent
  usersModalFor: "followers" | "following" | undefined;
  ownerUserId: number;
  isAuth: boolean;
  setUsersModalFor(value: "followers" | "following" | undefined): void;

  //From State
  users: Array<UserDataType>;
  usresOnPageCount: number;
  totalCount: number;
  isFetching: boolean;
  nextUsers: string | null;
  followingsInProgress: Array<number>;
  authUserId: number;
  getUsersList(count: number, page: number): void;
  getFollowersList(id: number, next: string | null): void;
  getFollowingList(id: number, next: string | null): void;
  toggleFollow(id: number, req: RequestForType): void;
  clearState(): void;
};

const UsersModal = (props: UsersModalProps) => {
  useEffect(() => {
    if (props.usersModalFor == "followers") {
      props.getFollowersList(props.ownerUserId, null);
    } else if (props.usersModalFor == "following") {
      props.getFollowingList(props.ownerUserId, null);
    }
  }, [props.usersModalFor]);

  useEffect(() => {
    return () => {
      props.clearState();
    };
  }, [props.usersModalFor]);

  const closeModalWindow = (): void => {
    document.getElementsByTagName('body')[0].style.overflowY = 'auto';
    props.setUsersModalFor(undefined);
  };

  const showMoreUsers = (): void => {
    if (props.usersModalFor == "followers") {
      props.getFollowersList(props.ownerUserId, props.nextUsers);
    } else if (props.usersModalFor == "following") {
      props.getFollowingList(props.ownerUserId, props.nextUsers);
    }
  };

  const followersOrFollowing = props.users.map((user, key) => (
    <User
      {...user}
      isAuth={props.isAuth}
      toggleFollow={props.toggleFollow}
      authUserId={props.authUserId}
      followingsInProgress={props.followingsInProgress}
      handleClickOnUser={closeModalWindow}
    />
  ));

  return (
    <div className={classes.users_modal_wrap} onClick={closeModalWindow}>
      <div className={classes.users_modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.menu}>
          <div
            className={`${classes.menu_item} ${
              props.usersModalFor == "followers" && classes.activeMenu
            }`}
            onClick={() => props.setUsersModalFor("followers")}
          >
            Подписчики
          </div>
          <div
            className={`${classes.menu_item} ${
              props.usersModalFor == "following" && classes.activeMenu
            }`}
            onClick={() => props.setUsersModalFor("following")}
          >
            Подписки
          </div>
          <div className={classes.close_btn} onClick={closeModalWindow}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className={classes.users_list_wrap} >
          <div className={classes.users_list}>{followersOrFollowing}</div>
          {typeof props.nextUsers == "string" && (
            <div className={classes.show_more_btn_wrap}>
              <button onClick={showMoreUsers}>Показать ещё</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

let mapSateToProps = (state: StateType) => ({
  users: state.usersData.users,
  usresOnPageCount: state.usersData.usresOnPageCount,
  totalCount: state.usersData.count,
  isFetching: state.usersData.isFetching,
  nextUsers: state.usersData.next,
  followingsInProgress: state.usersData.followingsInProgress,
  authUserId: state.auth.user_id,
});

export default connect(mapSateToProps, {
  getUsersList,
  getFollowersList,
  getFollowingList,
  toggleFollow,
  clearState,
})(UsersModal);
