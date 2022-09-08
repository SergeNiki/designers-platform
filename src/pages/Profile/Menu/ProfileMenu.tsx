import {
  faFolderOpen,
  faImages,
  faPaste,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useEffect, useState } from 'react';
import Tooltips from '../../../components/Tooltips/Tooltips';
import classes from './ProfileMenu.module.css';

type ContentType = 'посты' | 'виды подписок' | 'альбомы';

type ProfileMenuProps = {
  contentType: ContentType;
  setContentType(value: ContentType): void;
};

const elementsData: Array<{
  datatype: ContentType;
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

const ProfileMenu: React.FC<ProfileMenuProps> = memo((props) => {
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
    let text = event.currentTarget.getAttribute('datatype') as ContentType;
    props.setContentType(text);
    setTooltipText('');
  };

  const elements = elementsData.map((element) => {
    return (
      <div
        key={element.datatype}
        datatype={element.datatype}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={handleClick}
        className={`${classes.menu_item} ${
          props.contentType == element.datatype && classes.activeMenu
        }`}>
        <FontAwesomeIcon icon={element.icon} />
        {tooltipText == element.datatype && (
          <Tooltips orientation='vertical'>{tooltipText}</Tooltips>
        )}
      </div>
    );
  });

  return (
    <div className={classes.menu_wrap}>
      <span
        className={classes.active_bar}
        style={{ left: leftValueActiveBar }}></span>
      {elements}
    </div>
  );
});

export default ProfileMenu;
