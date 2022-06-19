import { NavLink } from "react-router-dom";
import { RequestForType } from "../../types/profile";
import { UserDataType } from "../../types/users";
import classes from "./User.module.css";

type UserProps = UserDataType & {
  isAuth: boolean;
  authUserId: number;
  followingsInProgress: Array<number>;
  toggleFollow(id: number, req: RequestForType): void;
  closeModalWindow(): void
};

const User = (props: UserProps) => {
  const toggleFollowHandler = () => {
      
    if (props.is_followed) {
      props.toggleFollow(props.id, "unfollow");
    } else {
      props.toggleFollow(props.id, "follow");
    }
  };

  return (
    <div className={classes.user_wrap}>
      <NavLink onClick={props.closeModalWindow} to={`id${props.id}`}>
        <div className={classes.user_info}>
          <img src={props.avatar} alt="avatar" />
          <div className={classes.naming}>
            <h3 className={classes.display_name}>{props.display_name}</h3>
            <p className={classes.username}>@{props.username}</p>
          </div>
        </div>
      </NavLink>
      <div className={classes.follow_wrap}>
        {props.isAuth && props.id !== props.authUserId && (
          <button
            disabled={props.followingsInProgress.some((id) => id === props.id)}
            onClick={toggleFollowHandler}
            style={
              props.is_followed
                ? { backgroundColor: "#C4C4C4" }
                : { backgroundColor: "#6DEFC0" }
            }
          >
            {props.is_followed ? "Отписаться" : "Подписаться"}
          </button>
        )}
        {/* <p>Подписчиков: {props.followers_count}</p> */}
      </div>
    </div>
  );
};

export default User;
