export type FormElement = {
  tag: 'input' | 'textarea';
  id: 'sub_name' | 'sub_description' | 'sub_price' | 'sub_image' | 'username' | 'display_name' | 'bio';
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
    sub_name: string
    sub_description: string
    sub_price: string
    sub_image: string
    username: string
    display_name: string
    bio: string
}