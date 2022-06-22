import React from "react";
import { connect } from "react-redux";
import classes from "./Header.module.css";
import { toggleLoginTC, logout } from "./../../redux/auth-reducer";
import { getAuthUserData } from "./../../redux/auth-reducer"
import { StateType } from "../../types/state";
import HeaderPopup from "./PopupMenu/HeaderPopup";

type HeaderProps = {
  is_auth: boolean;
  username: string | null;
  avatar: string | null;
  avatarFromProfile: string;
  display_name: string | null;
  toggleLoginTC(): void;
  logout(): void;
  getAuthUserData(): void;
}

const Header = (props: HeaderProps) => {

  React.useEffect(() => {
    props.getAuthUserData()
  }, [props.avatarFromProfile])

  const toggleLogin = () => {
    props.toggleLoginTC();
  };

  let [isPopupActive, setPopupActive] = React.useState<boolean>(false)
  
  const openPopupMenu = () => {
    setPopupActive(!isPopupActive)
  }

  return (
    <header>
      <div className={classes.header_wrap}>
        <h1>FLOW OF ART</h1>
        {props.is_auth ? (
          <div onClick={openPopupMenu} className={classes.avatar}>
            {props.avatar && <img src={props.avatar} alt="" />}
          </div>
        ) : (
          <div className={classes.login} onClick={toggleLogin}>
            LOGIN
          </div>
        )}
        {isPopupActive && <HeaderPopup logout={props.logout} display_name={props.display_name} username={props.username} avatar={props.avatar} setPopupActive={setPopupActive} />}
      </div>
    </header>
  );
};

let mapStateToProps = (state: StateType) => ({
  is_auth: state.auth.isAuth,
  username: state.auth.username,
  avatar: state.auth.avatar,
  avatarFromProfile: state.profilePage.avatar,
  display_name: state.auth.display_name
});

export default connect(mapStateToProps, { toggleLoginTC, logout, getAuthUserData })(Header);
