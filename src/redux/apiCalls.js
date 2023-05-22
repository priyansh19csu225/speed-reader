import API_URL from '../app/constants/apiUrls';
import { getRequest } from '../app/services';
import {
  getComprehensionsStart,
  getComprehensionsSuccess,
  getComprehensionsFailure,
  setComprehension,
} from './userSlice';

export const getComprehensions = async (dispatch) => {
  dispatch(getComprehensionsStart());
  try {
    getRequest(API_URL.COMPREHENSIONS).then((response) => {
      dispatch(getComprehensionsSuccess(response));
    });
  } catch (err) {
    dispatch(getComprehensionsFailure());
  }
};

export const setComprehensionRedux = async (dispatch, original) => {
  dispatch(setComprehension(original));
};
