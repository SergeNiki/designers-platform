import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubData } from '../../../types/subscriptions';
import classes from './PreviewInfo.module.css';

type PreviewFooterProps = {
  bottomValue: number;
  viewsCount: number;
  likesCount: number;
  isAccess: boolean;
  subscriptionData: Pick<SubData, 'id' | 'name'> | null;
};

const PreviewFooter: React.FC<PreviewFooterProps> = (props) => {
  return (
    <div
      className={classes.preview_footer}
      style={{ bottom: props.bottomValue + '%' }}>
      <div className={classes.views}>
        {props.viewsCount}
        <FontAwesomeIcon icon={faEye} />
      </div>
      {props.isAccess ? (
        <div className={classes.level_sub}>Доступен</div>
      ) : (
        <div className={classes.level_sub}>
          Доступно по подписке: {props.subscriptionData?.name}
        </div>
      )}
      <div className={classes.likes}>
        {props.likesCount}
        <FontAwesomeIcon icon={faHeart} />
      </div>
    </div>
  );
};

export default PreviewFooter;
