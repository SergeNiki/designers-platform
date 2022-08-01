import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import classes from "./ProfileSettings.module.css"
import ProfileSettingsForm from "./ProfileSettingsForm/ProfileSettingsForm"

type ProfileSettingsProps = {
    closeSettingsWindow(valuse: false): void
}

const ProfileSettings = (props: ProfileSettingsProps) => {
    return <ModalWindow closeWindow={props.closeSettingsWindow} >
        <div className={classes.settings_header} >
            <h2>Настройка профиля</h2>
        </div>
        <ProfileSettingsForm closeWindow={props.closeSettingsWindow} />
    </ModalWindow>
}

export default ProfileSettings