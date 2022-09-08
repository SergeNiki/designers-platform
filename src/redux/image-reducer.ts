import {
  ClearImageState,
  SetImagePreview,
  SetImageFile,
  ImageActions,
  IImageState,
  ImageActionTypes,
  ThunkType,
} from '../types/image';
import { addPopup } from './popup-reducer';

let initialState: IImageState = {
  imageFile: new File([], ''),
  imagePreview: '',
};

// Reducer
const imageReducer = (
  state = initialState,
  action: ImageActions
): IImageState => {
  switch (action.type) {
    case ImageActionTypes.SET_IMAGE_FILE:
      return { ...state, imageFile: action.imageFile };
    case ImageActionTypes.SET_IMAGE_PREVIEW:
      return { ...state, imagePreview: action.imagePreview };
    case ImageActionTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

// Action Creators
export const setImageFile = (imageFile: File): SetImageFile => ({
  type: ImageActionTypes.SET_IMAGE_FILE,
  imageFile,
});
export const setImagePreview = (imagePreview: string): SetImagePreview => ({
  type: ImageActionTypes.SET_IMAGE_PREVIEW,
  imagePreview,
});
export const clearImageState = (): ClearImageState => ({
  type: ImageActionTypes.CLEAR_STATE,
});

// Thunk Creators
export const checkImage = (
  event: React.ChangeEvent<HTMLInputElement>,
  maxSize: number,
  isSuccess: React.Dispatch<React.SetStateAction<boolean>>
): ThunkType => {
  return async (dispatch) => {
    if (event.currentTarget.files?.length) {
      const file = event.currentTarget.files[0];
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        dispatch(addPopup('Неподходящий тип или формат файла!', false));
      } else if (file.size >= maxSize * 1000000) {
        dispatch(
          addPopup(`Размер изображения не должн превышать ${maxSize}Мб!`, false)
        );
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
          dispatch(setImagePreview(String(this.result)));
        };
        dispatch(setImageFile(file));
        isSuccess(true);
      }
    }
  };
};

export default imageReducer;
