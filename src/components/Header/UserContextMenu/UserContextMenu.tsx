import {
  faArrowRightFromBracket,
  faUser,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import Dropdown from '../../Dropdown/Dropdown';
import classes from './UserContextMenu.module.css';

type HeaderPopupProps = {
  username: string | null;
  display_name: string | null;
  avatar: string | null;
  logout(): void;
  closeMenu(value: boolean): void;
  coordsData: DOMRect;
};

const UserContextMenu = (props: HeaderPopupProps) => {
  const onMyProfile = () => {
    props.closeMenu(false);
  };

  const onLogout = () => {
    props.closeMenu(false);
    props.logout();
  };

  return (
    <Dropdown
      coordsData={props.coordsData}
      closeDropdownMwnu={() => props.closeMenu(false)}
    >
      <div className={classes.user_info}>
        {props.avatar && <img src={props.avatar} alt="" />}
        <div className={classes.naming}>
          <h3 className={classes.display_name}>{props.display_name}</h3>
          <p className={classes.username}>@{props.username}</p>
        </div>
      </div>
      <NavLink
        to={'/profile'}
        onClick={onMyProfile}
        className={classes.list_item}
      >
        <FontAwesomeIcon icon={faUser} />
        <p>Мой профиль</p>
      </NavLink>
      <NavLink
        to={'/settings'}
        onClick={onMyProfile}
        className={classes.list_item}
      >
        <FontAwesomeIcon icon={faUserGear} />
        <p>Настройки</p>
      </NavLink>
      <div
        onClick={onLogout}
        className={classes.logout + ' ' + classes.list_item}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        <p>Выход</p>
      </div>
    </Dropdown>
  );
};

export default UserContextMenu;
