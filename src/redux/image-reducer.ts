import {
  ActionClearImageState,
  ActionSetCoverPreview,
  ActionSetImage,
  ActionsImage,
  IImageState,
  ImageActionsType,
  ThunkType,
} from '../types/image';
import { addPopup } from './popup-reducer';

let initialState: IImageState = {
  imageFile: null,
  coverPreview: '',
};

const imageReducer = (
  state = initialState,
  action: ActionsImage
): IImageState => {
  switch (action.type) {
    case ImageActionsType.SET_IMAGE_FILE:
      return { ...state, imageFile: action.imageFile };
    case ImageActionsType.SET_COVER_PREVIEW:
      return { ...state, coverPreview: action.coverPreview };
    case ImageActionsType.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

export const setImageFile = (imageFile: File): ActionSetImage => ({
  type: ImageActionsType.SET_IMAGE_FILE,
  imageFile,
});
export const setCoverPreview = (
  coverPreview: string
): ActionSetCoverPreview => ({
  type: ImageActionsType.SET_COVER_PREVIEW,
  coverPreview,
});
export const clearImageState = (): ActionClearImageState => ({
  type: ImageActionsType.CLEAR_STATE,
});

export const checkImage = (
  event: React.ChangeEvent<HTMLInputElement>,
  maxSize: number,
  isSuccess: React.Dispatch<React.SetStateAction<boolean>>
): ThunkType => {
  return async (dispatch) => {
    if (event.currentTarget.files?.length) {
      const file = event.currentTarget.files[0];
      if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
        dispatch(addPopup('Неподходящий тип или формат файла!', false))
      } else if(file.size >= maxSize * 1000000) {
        dispatch(addPopup(`Размер изображения не должн превышать ${maxSize}Мб!`, false))
      }  else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
          dispatch(setCoverPreview(String(this.result)));
        };
        dispatch(setImageFile(file));
        isSuccess(true)
      }
    }
  };
};

export default imageReducer;
