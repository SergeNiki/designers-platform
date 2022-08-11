import {
  faFolderOpen,
  faImages,
  faPaste,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Tooltips from '../../../components/Tooltips/Tooltips';
import classes from './ProfileMenu.module.css';

type ProfileMenuProps = {
  contentType: 'посты' | 'виды подписок' | 'альбомы';
  setContentType(value: 'посты' | 'виды подписок' | 'альбомы'): void;
};

const ProfileMenu: React.FC<ProfileMenuProps> = (props) => {
  const [tooltipText, setTooltipText] = useState<string>('');
  const [leftValueActiveBar, setLeftValueActiveBar] = useState<string>('');

  useEffect(() => {
    if (props.contentType == 'виды подписок') setLeftValueActiveBar('0');
    else if (props.contentType == 'альбомы')
      setLeftValueActiveBar('calc((100% / 3) * 2)');
    else setLeftValueActiveBar('calc(100% / 3)');
  }, [props.contentType]);

  const showTooltip = (event: React.MouseEvent<HTMLDivElement>) => {
    let text = event.currentTarget.getAttribute(
      'datatype'
    ) as typeof props.contentType;
    setTooltipText(text);
  };
  const hideTooltip = (event: React.MouseEvent<HTMLDivElement>) => {
    setTooltipText('');
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    let text = event.currentTarget.getAttribute(
      'datatype'
    ) as typeof props.contentType;
    props.setContentType(text);
    setTooltipText('');
  };

  const elementsData: Array<{
    datatype: typeof props.contentType;
    icon: IconDefinition;
  }> = [
    {
      datatype: 'виды подписок',
      icon: faPaste,
    },
    {
      datatype: 'посты',
      icon: faImages,
    },
    {
      datatype: 'альбомы',
      icon: faFolderOpen,
    },
  ];

  const elements = elementsData.map((element) => {
    return (
      <div key={element.datatype}
        datatype={element.datatype}
        onMouseOver={showTooltip}
        onMouseOut={hideTooltip}
        onClick={handleClick}
        className={`${classes.menu_item} ${
          props.contentType == element.datatype && classes.activeMenu
        }`}
      >
        <FontAwesomeIcon icon={element.icon} />
        {tooltipText == element.datatype && (
          <Tooltips orientation="vertical">{tooltipText}</Tooltips>
        )}
      </div>
    );
  });

  return (
    <div className={classes.menu_wrap}>
      <span
        className={classes.active_bar}
        style={{ left: leftValueActiveBar }}
      ></span>
      {elements}
    </div>
  );
};

export default ProfileMenu;
