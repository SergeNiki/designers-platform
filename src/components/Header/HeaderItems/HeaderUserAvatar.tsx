import { useState } from 'react';
import classes from './HeaderItems.module.css'

type HeaderUserAvatarProps = {
    avatar: string | null
    openUserContextMenu(event: React.MouseEvent<HTMLDivElement>): void;
}

const HeaderUserAvatar: React.FC<HeaderUserAvatarProps> = ({avatar, openUserContextMenu}) => {

    return <div onClick={openUserContextMenu} className={classes.avatar}>
    {avatar && <img src={avatar} alt='' />}
  </div>
}

export default HeaderUserAvatar