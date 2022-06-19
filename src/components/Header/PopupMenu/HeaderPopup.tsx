import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, NavLink } from "react-router-dom";
import classes from "./HeaderPopup.module.css";

type HeaderPopupProps = {
  username: string | null;
  display_name: string | null;
  avatar: string | null;
  logout(): void;
  setPopupActive(value: boolean): void;
};

const HeaderPopup = (props: HeaderPopupProps) => {

  const onMyProfile = () => {
    props.setPopupActive(false);
  }

  const onLogout = () => {
    props.setPopupActive(false);
    props.logout();
  }

  return (
    <div className={classes.popup_wrap}>
      <div className={classes.user_info}>
        {props.avatar && <img src={props.avatar} alt="" />}
        <div className={classes.naming}>
          <h3 className={classes.display_name}>{props.display_name}</h3>
          <p className={classes.username}>@{props.username}</p>
        </div>
      </div>
      <NavLink to={"/profile"} onClick={onMyProfile} className={classes.list_item}>
        <FontAwesomeIcon icon={faUser} />
        <p>Мой профиль</p>
      </NavLink>
      <div
        onClick={onLogout}
        className={classes.logout + " " + classes.list_item}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        <p>Выход</p>
      </div>
    </div>
  );
};

export default HeaderPopup;
