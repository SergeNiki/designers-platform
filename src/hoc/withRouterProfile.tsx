import { ComponentType } from 'react';
import { Navigate, useParams } from 'react-router-dom';

interface WrapperProps {
  authUserId: number | null;
}

export default function withRouterProfile<WP extends WrapperProps>(
  WrappedComponent: ComponentType<WP>
) {
  return (props: WrapperProps) => {
    let { userId } = useParams();
    if (!userId) {
      return <Navigate to={`/profile/id${props.authUserId}`} />;
    }

    return (
      <WrappedComponent
        isOwner={Number(userId) == props.authUserId}
        ownerUserId={userId}
        {...(props as WP)}
      />
    );
  };
}
