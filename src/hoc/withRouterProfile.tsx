import { ComponentType } from "react";
import { Navigate, useParams } from "react-router-dom";
import { IProfileState } from "../types/profile";

export interface WrapperProps {
    authUserId: number | null;
}
  
export default function withRouter<WP extends WrapperProps>(WrappedComponent: ComponentType<WP>) {
    return (props: WrapperProps) => {
        let {user_id} = useParams();
        if (!user_id) {
          return <Navigate to={`/profile/id${props.authUserId}`} />;
        }
  
        return <WrappedComponent isOwner={Number(user_id) == props.authUserId} ownerUserId={user_id} {...props as WP} />;
    };
};