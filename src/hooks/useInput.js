import { useState } from 'react';

const useInput = (validate) => {
  const [value, setValue] = useState('');
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const onChangeValueHandler = (e) => {
    setValue(e.target.value);
  };

  const onBlurHandler = (e) => {
    setHasBeenTouched(true);
  };

  const isValueValid = validate(value);

  return {
    value,
    hasBeenTouched,
    onBlurHandler,
    onChangeValueHandler,
    isValueValid,
  };
};

export default useInput;
