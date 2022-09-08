import { connect } from 'react-redux';
import * as Yup from 'yup';
import { StateType } from '../../../redux/redux-store';
import { editSubscription } from '../../../redux/subscriptions-reducer';
import { checkImage, clearImageState } from '../../../redux/image-reducer';
import SubCoverDownload from '../SubCoverDownload/SubCoverDownload';
import { FormElement } from '../../../types/form';
import Form from '../../Form/Form';
import { useEffect } from 'react';
import { SubEditData } from '../../../types/subscriptions';

type SubEditFormProps = {
  imageFile: File;
  coverPreview: string;
  clearImageState(): void;
  checkImage(
    event: React.ChangeEvent<HTMLInputElement>,
    maxSize: number,
    isSuccess: React.Dispatch<React.SetStateAction<boolean>>
  ): void;
  editSubscription(subId: number, data: SubEditData): void;

  subId: number;
  subName: string;
  subDescription: string;
  subCoverPreview: string;
  subPrice: string;
  closeWindow(): void;
};

type SubForm = {
  subName: string;
  subDescription: string;
};

const SubEditForm = (props: SubEditFormProps) => {
  useEffect(() => {
    return () => props.clearImageState()
  }, [])  
  
  const validationSchema = Yup.object().shape({
    subName: Yup.string()
      .required('У подписки должно быть название!')
      .min(3, 'Название подписки не может содержать менее 3 символов')
      .max(40, 'Название подписки не может содержать более 40 символов'),
    subDescription: Yup.string()
      .required('У подписки должно быть описание!')
      .min(3, 'Описание не может содержать менее 3 символов!')
      .max(2000, 'Описание не может содержать более 2000 символов!'),
  });

  const onSubmit = (data: SubForm) => {
    let editBody: SubEditData = {}
    if(data.subName) editBody.name = data.subName
    if(data.subDescription) editBody.description = data.subDescription
    editBody.image = props.imageFile
    props.editSubscription(props.subId, editBody);
    props.closeWindow();
  };

  const extraElement = (
    <SubCoverDownload
      coverPreview={props.coverPreview}
      defaultCoverPreview={props.subCoverPreview}
      checkImage={props.checkImage}
    />
  );

  const formElements: Array<FormElement> = [
    {
      tag: 'input',
      id: 'subName',
      type: 'text',
      label: 'Название подписки',
      defaultvalue: props.subName,
      placeholder: 'Введите название',
    },
    {
      tag: 'textarea',
      id: 'subDescription',
      label: 'Описание подписки',
      defaultvalue: props.subDescription,
      placeholder: 'Введите описание',
    },
  ];

  return (
    <Form
      onSubmit={onSubmit}
      textBtn="Сохранить"
      formElements={formElements}
      validSchema={validationSchema}
      extraElements={[{ index: 1, id: 'sub_image', element: extraElement }]}
    />
  );
};

let mapSateToProps = (state: StateType) => ({
  imageFile: state.image.imageFile,
  coverPreview: state.image.imagePreview,
});

export default connect(mapSateToProps, {
  checkImage,
  editSubscription,
  clearImageState
})(SubEditForm);
