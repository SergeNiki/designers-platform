import classes from './UsersModalMenu.module.css';

type UsersModalMenuProps = {
  usersModalFor: 'followers' | 'following' | false;
  setUsersModalFor(value: 'followers' | 'following' | false): void;
};

const UsersModalMenu = (props: UsersModalMenuProps) => {
  return (
    <div className={classes.menu}>
      <div
        className={`${classes.menu_item} ${
          props.usersModalFor == 'followers' && classes.activeMenu
        }`}
        onClick={() => props.setUsersModalFor('followers')}
      >
        Подписчики
      </div>
      <div
        className={`${classes.menu_item} ${
          props.usersModalFor == 'following' && classes.activeMenu
        }`}
        onClick={() => props.setUsersModalFor('following')}
      >
        Подписки
      </div>
    </div>
  );
};

export default UsersModalMenu;
