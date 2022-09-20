import { ComponentType } from 'react';
import { Navigate, useParams } from 'react-router-dom';

interface WrapperProps {
  isAuth: boolean;
  addPopup(contentMessage: string, isSuccessful: boolean): void;
}

export default function withRouterPost<WP extends WrapperProps>(
  WrapperComponent: ComponentType<WP>
) {
  return (props: WrapperProps) => {
    if (!props.isAuth) {
      props.addPopup('Вы не авторизованы!', true);
      return <Navigate to={'/main'} />;
    } else {
      let { postId } = useParams();
      return <WrapperComponent postId={Number(postId)} {...(props as WP)} />;
    }
  };
}
