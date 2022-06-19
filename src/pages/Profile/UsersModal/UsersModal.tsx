import { connect } from "react-redux";
import { StateType } from "../../../types/state";
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
  followingsInProgress: Array<number>;
  authUserId: number;
  getUsersList(count: number, page: number): void;
  getFollowersList(id: number): void;
  getFollowingList(id: number): void;
  toggleFollow(id: number, req: RequestForType): void;
  clearState(): void;
};

const UsersModal = (props: UsersModalProps) => {
  useEffect(() => {
    if (props.usersModalFor == "followers") {
      props.getFollowersList(props.ownerUserId);
    } else if (props.usersModalFor == "following") {
      props.getFollowingList(props.ownerUserId);
    }
  }, [props.usersModalFor]);

  useEffect(() => {
    return () => {
      props.clearState();
    };
  }, []);

  const closeModalWindow = () => {
    props.setUsersModalFor(undefined);
  };

  const followersOrFollowing = props.users.map((user, key) => (
    <User
      {...user}
      isAuth={props.isAuth}
      toggleFollow={props.toggleFollow}
      authUserId={props.authUserId}
      followingsInProgress={props.followingsInProgress}
      closeModalWindow={closeModalWindow}
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
        <div className={classes.users_list}>{followersOrFollowing}</div>
      </div>
    </div>
  );
};

let mapSateToProps = (state: StateType) => ({
  users: state.usersData.users,
  usresOnPageCount: state.usersData.usresOnPageCount,
  totalCount: state.usersData.count,
  isFetching: state.usersData.isFetching,
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
