import React, { CSSProperties, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { StateType } from '../../redux/redux-store';
import { PostPreviewData } from '../../types/postsList';
import { getSubscriptions } from '../../redux/subscriptions-reducer';
import classes from './Preview.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-regular-svg-icons';

type PreviewProps = {
  previewData: PostPreviewData;
  isOwner: boolean;

  getSubscriptions(userId: number): void;
};

const Preview: React.FC<PreviewProps> = (props) => {
  const [headerStyles, setHesderStyles] = useState<CSSProperties>(
    window.innerWidth > 768
      ? {
          top: '-18%',
        }
      : { top: '5%' }
  );
  const [footerStyles, setFooterStyles] = useState<CSSProperties>(
    window.innerWidth > 768
      ? {
          bottom: '-18%',
        }
      : { bottom: '5%' }
  );

  const mouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth > 768) {
      setHesderStyles({ top: '5%' });
      setFooterStyles({ bottom: '5%' });
    }
  };
  const mouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth > 768) {
      setHesderStyles({ top: '-18%' });
      setFooterStyles({ bottom: '-18%' });
    }
  };

  return (
    <div
      className={classes.preview_wrap}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}>
      <div className={classes.preview_header} style={headerStyles}>
        <div className={classes.avatar_wrap}>
          <NavLink to={`/profile/id${props.previewData.author.id}`}>
            <img
              src={props.previewData.author.avatar}
              className={classes.avatar}
              alt={props.previewData.author.display_name}
            />
          </NavLink>
        </div>
        <div className={classes.author_name}>
          <NavLink to={`/profile/id${props.previewData.author.id}`}>
            {props.previewData.author.display_name}
          </NavLink>
        </div>
      </div>
      <div className={classes.preview_footer} style={footerStyles}>
        <div className={classes.views}>
          {props.previewData.views_count}
          <FontAwesomeIcon icon={faEye} />
        </div>
        {props.previewData.access ? (
          <div className={classes.level_sub}>Доступен</div>
        ) : (
          <div className={classes.level_sub}>
            Доступно по подписке: {props.previewData.level_subscription?.name}
          </div>
        )}
        <div className={classes.likes}>
          {props.previewData.likes_count}
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
      <NavLink to={'/'}>
        <img
          src={props.previewData.preview}
          alt='image'
          className={classes.preview_image}
        />
      </NavLink>
    </div>
  );
};

let mapSateToProps = (state: StateType) => ({
  subscriptionName: state.subscriptionsData.results,
});

export default connect(mapSateToProps, {
  getSubscriptions,
})(Preview);
