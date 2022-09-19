import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { StateType } from '../../../redux/redux-store';
import { addPopup } from '../../../redux/popup-reducer';
import classes from './PreviewImage.module.css';

type PreviewImageProps = {
  isAuth: boolean;
  isAccess: boolean;
  postId: number;
  previewImage: string;
  addPopup(contentMessage: string, isSuccessful: boolean): void;
};

const PreviewImage: React.FC<PreviewImageProps> = (props) => {
  const chekAccess = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!props.isAuth) {
      e.preventDefault();
      props.addPopup('Вы не авторизованы!', true);
    } else if (!props.isAccess) {
      e.preventDefault();
      props.addPopup('Отсутствует необходимая подписка!', true);
    }
  };

  return (
    <NavLink to={`/post/${props.postId}`} onClick={chekAccess}>
      <img
        src={props.previewImage}
        alt='image'
        className={classes.preview_image}
      />
    </NavLink>
  );
};

let mapStateToProps = (state: StateType) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {
  addPopup,
})(PreviewImage);
