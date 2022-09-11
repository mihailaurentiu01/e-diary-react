import { useCallback, useReducer } from 'react';

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
      const transformedData = [];

      for (const key in action.payload) {
        const dataObj = {
          id: key,
          ...action.payload[key],
        };

        transformedData.push(dataObj);
      }

      return {
        ...state,
        status: 'completed',
        data: transformedData,
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
  const [state, dispatch] = useReducer(useHttpReducer, {
    ...initialState,
    pending: startAsPending ? 'pending' : '',
  });

  const sendRequest = useCallback(
    async (data) => {
      try {
        dispatch({ type: 'pending' });

        setTimeout(async () => {
          try {
            const res = await requestFn(data);

            dispatch({ type: 'completed', payload: res.data });
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
