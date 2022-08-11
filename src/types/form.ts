export type FormElement = {
  tag: 'input' | 'textarea';
  id: FormId
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

type FormId =
  | 'subName'
  | 'subDescription'
  | 'subPrice'
  | 'subCoverPreview'
  | 'username'
  | 'display_name'
  | 'bio';
export type FormInputs = Record<FormId, string>;
