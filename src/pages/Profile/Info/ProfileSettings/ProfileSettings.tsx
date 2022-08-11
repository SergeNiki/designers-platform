import ModalWindow from '../../../../components/ModalWindow/ModalWindow';
import ProfileSettingsForm from './ProfileSettingsForm';

type ProfileSettingsProps = {
  username: string;
  displayName: string;
  bio: string;
  closeSettingsWindow(): void;
};

const ProfileSettings = (props: ProfileSettingsProps) => {
  const header = <h2>Настройки профиля</h2>;

  return (
    <ModalWindow closeWindow={props.closeSettingsWindow} header={header}>
      <ProfileSettingsForm
        username={props.username}
        displayName={props.displayName}
        bio={props.bio}
        closeWindow={props.closeSettingsWindow}
      />
    </ModalWindow>
  );
};

export default ProfileSettings;
