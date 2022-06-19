import React from "react";
import classes from "./ProfileMenu.module.css";

type ProfileMenuProps = {
  contentType: "posts" | "sub_types" | "albums";
  setContentType(value: "posts" | "sub_types" | "albums"): void;
};

const ProfileMenu: React.FC<ProfileMenuProps> = (props) => {

  return (
    <div className={classes.menu_wrap}>
      <div
        onClick={() => props.setContentType("sub_types")}
        className={`${classes.menu_item} ${
          props.contentType == "sub_types" && classes.activeMenu
        }`}
      >
        виды подписки
      </div>
      <div
        onClick={() => props.setContentType("posts")}
        className={`${classes.menu_item} ${
          props.contentType == "posts" && classes.activeMenu
        }`}
      >
        посты
      </div>
      <div
        onClick={() => props.setContentType("albums")}
        className={`${classes.menu_item} ${
          props.contentType == "albums" && classes.activeMenu
        }`}
      >
        альбомы
      </div>
    </div>
  );
};

export default ProfileMenu;
