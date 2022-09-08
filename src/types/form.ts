export type FormElement = {
  tag: 'input' | 'textarea';
  id: SubscriptionId | UserDataId;
  label: string;
  type?:
    | 'text'
    | 'password'
    | 'radio'
    | 'checkbox'
    | 'hidden'
    | 'button'
    | 'submit'
    | 'reset'
    | 'file'
    | 'image';
  placeholder?: string;
  defaultvalue?: string;
  jsxElement?: React.ReactNode;
  data?: React.ReactNode;
};

type SubscriptionId = 'subName' | 'subDescription' | 'subPrice';
type UserDataId = 'username' | 'display_name' | 'bio';

export type SubForm = Record<SubscriptionId, string>
export type UserDataForm = Record<UserDataId, string>

export type FormInputs = SubForm & UserDataForm;
