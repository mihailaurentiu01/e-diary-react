import { useCallback, useReducer } from 'react';
import { useSelector } from 'react-redux';

const initialState = {
  status: '',
  data: null,
  error: null,
};

const useHttpReducer = (state, action) => {
  switch (action.type) {
    case 'pending': {
      return {
        ...state,
        data: null,
        status: 'pending',
      };
    }
    case 'completed': {
      return {
        ...state,
        status: 'completed',
        data: action.payload,
      };
    }
    case 'error': {
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    }
    case 'clearError': {
      return {
        ...state,
        status: '',
        error: null,
      };
    }
    default:
      return state;
  }
};

const useHttp = (requestFn, startAsPending = false) => {
  const { id: loggedInUserId } = useSelector((state) => state.Auth.user);

  const [state, dispatch] = useReducer(useHttpReducer, {
    ...initialState,
    status: startAsPending ? 'pending' : '',
  });

  const sendRequest = useCallback(
    async (data) => {
      try {
        dispatch({ type: 'pending' });

        setTimeout(async () => {
          try {
            const res = await requestFn(data);

            dispatch({ type: 'completed', payload: filterByUserId(res.data) });
          } catch (error) {
            dispatch({ type: 'error', payload: error });
          }
        }, 2000);
      } catch (error) {
        dispatch({ type: 'error', payload: error });
      }
    },
    [requestFn]
  );

  const filterByUserId = (data) => {
    const transformedData = transformData(data);
    const hasUserid = transformedData.some((el) => el.userId);

    if (hasUserid) {
      const formattedData = transformedData.filter(
        (el) => el.userId === loggedInUserId
      );
      return formattedData;
    }

    return transformedData;
  };

  const transformData = (data) => {
    const transformedData = [];

    for (const key in data) {
      const dataObj = {
        id: key,
        ...data[key],
      };

      transformedData.push(dataObj);
    }

    return transformedData;
  };

  const clearError = () => {
    dispatch({ type: 'clearError' });
  };

  return {
    ...state,
    sendRequest,
    clearError,
  };
};

export default useHttp;
