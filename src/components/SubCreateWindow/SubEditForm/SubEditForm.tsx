import { connect } from "react-redux"
import * as Yup from 'yup';
import { StateType } from "../../../redux/redux-store"
import {editSubscription} from '../../../redux/subscriptions-reducer'
import { checkImage } from '../../../redux/image-reducer';
import { SubscriptionData } from "../../../types/subscriptions"
import SubCoverDownload from "../SubCoverDownload/SubCoverDownload";
import { FormElement } from "../../../types/form";
import Form from "../../Form/Form";

type SubEditFormProps = {
    imageFile: File | null;
    coverPreview: string;
    checkImage(
        event: React.ChangeEvent<HTMLInputElement>,
        maxSize: number,
        isSuccess: React.Dispatch<React.SetStateAction<boolean>>
      ): void;
    editSubscription(subId: number, data: SubscriptionData): void

    subId: number
    sub_name: string
    sub_description: string
    sub_cover_preview: string
    sub_price: string
    closeWindow(value: false): void
}

type SubForm = {
    sub_name: string;
    sub_description: string;
  };

const SubEditForm = (props: SubEditFormProps) => {
    const validationSchema = Yup.object().shape({
        sub_name: Yup.string()
          .required('У подписки должно быть название!')
          .min(3, 'Название подписки не может содержать менее 3 символов')
          .max(40, 'Название подписки не может содержать более 40 символов'),
        sub_description: Yup.string()
          .required('У подписки должно быть описание!')
          .min(3, 'Описание не может содержать менее 3 символов!')
          .max(2000, 'Описание не может содержать более 2000 символов!')
      });

      const onSubmit = (data: SubForm) => {
        props.editSubscription(
        props.subId,
        {
          description: data.sub_description,
          image: props.imageFile,
          name: data.sub_name,
          price: props.sub_price,
          price_currency: 'RUB',
        });
        props.closeWindow(false);
      };

      const extraElement = (
        <SubCoverDownload
          coverPreview={props.coverPreview ? props.coverPreview : props.sub_cover_preview}
          checkImage={props.checkImage}
        />
      );

      const formElements: Array<FormElement> = [
        {
          tag: 'input',
          id: 'sub_name',
          type: 'text',
          label: 'Название подписки',
          defaultvalue: props.sub_name,
          placeholder: 'Введите название',
        },
        {
          tag: 'textarea',
          id: 'sub_description',
          label: 'Описание подписки',
          defaultvalue: props.sub_description,
          placeholder: 'Введите описание',
        },
      ];

    return     <Form
    onSubmit={onSubmit}
    textBtn="Сохранить"
    formElements={formElements}
    validSchema={validationSchema}
    extraDependence={!props.imageFile}
    extraElements={[{ index: 1, id: 'sub_image', element: extraElement }]}
  />
}

let mapSateToProps = (state: StateType) => ({
    imageFile: state.image.imageFile,
    coverPreview: state.image.coverPreview,
})

export default connect(mapSateToProps, {
    checkImage,
    editSubscription
})(SubEditForm)