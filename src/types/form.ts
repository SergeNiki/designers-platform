export type FormElement = {
  tag: 'input' | 'textarea';
  id:
    | 'subName'
    | 'subDescription'
    | 'subPrice'
    | 'subCoverPreview'
    | 'username'
    | 'display_name'
    | 'bio';
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
};

export type FormInputs = {
  subName: string;
  subDescription: string;
  subPrice: string;
  subCoverPreview: string;
  username: string;
  display_name: string;
  bio: string;
};
