import React, { useState } from 'react';
import { PostPreviewData } from '../../types/postsList';
import classes from './Preview.module.css';
import PreviewImage from './PreviewImage/PreviewImage';
import PreviewFooter from './PreviewInfo/PreviewFooter';
import PreviewHeader from './PreviewInfo/PreviewHeader';

type PreviewProps = {
  previewData: PostPreviewData;
  isOwner: boolean;
};

const Preview: React.FC<PreviewProps> = (props) => {
  const [infoTopBottomValues, setInfoTopBottomValues] = useState<number>(
    window.innerWidth > 768 ? -18 : 5
  );

  const mouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth > 768) {
      setInfoTopBottomValues(5);
    }
  };
  const mouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth > 768) {
      setInfoTopBottomValues(-18);
    }
  };

  return (
    <div
      className={classes.preview_wrap}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}>
      <PreviewHeader
        topValue={infoTopBottomValues}
        authorData={props.previewData.author}
      />
      <PreviewFooter
        bottomValue={infoTopBottomValues}
        viewsCount={props.previewData.views_count}
        likesCount={props.previewData.likes_count}
        isAccess={props.previewData.access}
        subscriptionData={props.previewData.level_subscription}
      />
      <PreviewImage
        isAccess={props.previewData.access}
        postId={props.previewData.id}
        previewImage={props.previewData.preview}
      />
    </div>
  );
};

export default Preview;
