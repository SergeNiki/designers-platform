import * as Yup from 'yup';
import { SubCreateData } from '../../../types/subscriptions';
import React, { useEffect } from 'react';
import { FormElement } from '../../../types/form';
import Form from '../../Form/Form';
import { connect } from 'react-redux';
import { StateType } from '../../../redux/redux-store';
import { creatingSubscription } from '../../../redux/subscriptions-reducer';
import { checkImage, clearImageState } from '../../../redux/image-reducer';
import SubCoverDownload from '../SubCoverDownload/SubCoverDownload';

type SubCreateFormProps = {
  imageFile: File | null;
  coverPreview: string;
  clearImageState(): void;
  checkImage(
    event: React.ChangeEvent<HTMLInputElement>,
    maxSize: number,
    isSuccess: React.Dispatch<React.SetStateAction<boolean>>
  ): void;
  creatingSubscription(data: SubCreateData): void;
  

  closeWindow(value: false): void;
};

type SubForm = {
  subName: string;
  subDescription: string;
  subPrice: string;
};

const SubCreateForm = (props: SubCreateFormProps) => {
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
    subPrice: Yup.string()
      .required('Это поле не может быть пустым!')
      .matches(/^[0-9]+$/, 'Стоимость подписки может содержать только числа!')
      .test(
        'min',
        'Минимальная стоимость подписки начинается с 15 рублей!',
        (price) => Number(price) >= 15
      )
      .test(
        'max',
        'Максимальная стоимость не может превышать 100000 рублей!',
        (price) => Number(price) <= 100000
      ),
  });

  const onSubmit = (data: SubForm) => {
    props.creatingSubscription({
      description: data.subDescription,
      image: props.imageFile,
      name: data.subName,
      price: data.subPrice,
      price_currency: 'RUB',
    });
    props.closeWindow(false);
  };

  const extraElement = (
    <SubCoverDownload
      coverPreview={props.coverPreview}
      checkImage={props.checkImage}
    />
  );

  const formElements: Array<FormElement> = [
    {
      tag: 'input',
      id: 'subName',
      type: 'text',
      label: 'Название подписки',
      placeholder: 'Введите название',
    },
    {
      tag: 'textarea',
      id: 'subDescription',
      label: 'Описание подписки',
      placeholder: 'Введите описание',
    },
    {
      tag: 'input',
      id: 'subPrice',
      type: 'text',
      label: 'Месячная стоимость (в руб.)',
      placeholder: 'Введите стоимость',
    },
  ];

  return (
    <Form
      onSubmit={onSubmit}
      textBtn="Создать"
      formElements={formElements}
      validSchema={validationSchema}
      extraDependence={!props.imageFile}
      extraElements={[{ index: 1, id: 'sub_image', element: extraElement }]}
    />
  );
};

let mapSateToProps = (state: StateType) => ({
  imageFile: state.image.imageFile,
  coverPreview: state.image.coverPreview,
});

export default connect(mapSateToProps, {
  checkImage,
  creatingSubscription,
  clearImageState
})(SubCreateForm);
