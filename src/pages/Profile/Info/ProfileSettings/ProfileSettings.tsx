import ModalWindow from '../../../../components/ModalWindow/ModalWindow';
import classes from './ProfileSettings.module.css';
import ProfileSettingsForm from './ProfileSettingsForm/ProfileSettingsForm';

type ProfileSettingsProps = {
  username: string;
  display_name: string;
  bio: string;
  closeSettingsWindow(valuse: false): void;
};

const ProfileSettings = (props: ProfileSettingsProps) => {
  const header = <h2>Настройки профиля</h2>;

  return (
    <ModalWindow closeWindow={props.closeSettingsWindow} header={header}>
      <ProfileSettingsForm
        username={props.username}
        display_name={props.display_name}
        bio={props.bio}
        closeWindow={props.closeSettingsWindow}
      />
    </ModalWindow>
  );
};

export default ProfileSettings;
