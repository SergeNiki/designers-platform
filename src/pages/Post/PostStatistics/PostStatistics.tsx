import classes from './PostStatistics.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartLiked } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { StateType } from '../../../redux/redux-store';
import { toggleLikePost } from '../../../redux/postData-reducer';

type PostStatisticsProps = {
    postId: number
    
    isLiked: boolean
    likesCount: number
    viewsCount: number
    toggleLikePost(id: number, isLiked: boolean): void;
}

const PostStatistics: React.FC<PostStatisticsProps> = (props) => {

  const toggleLike = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    props.toggleLikePost(props.postId, props.isLiked);
  };

    return <div className={classes.statistics}>
    <div className={classes.likes}>
      {props.isLiked ? (
        <FontAwesomeIcon onClick={toggleLike} icon={faHeart} />
      ) : (
        <FontAwesomeIcon onClick={toggleLike} icon={faHeartLiked} />
      )}
      <p>{props.likesCount}</p>
    </div>
    <div className={classes.views}>
      <FontAwesomeIcon icon={faEye} />
      <p>{props.viewsCount}</p>
    </div>
  </div>
}

let mapSateToProps = (state: StateType) => ({
    isLiked: state.postData.is_liked,
    likesCount: state.postData.likes_count,
    viewsCount: state.postData.views_count
})

export default connect(mapSateToProps, {
    toggleLikePost
})(PostStatistics)