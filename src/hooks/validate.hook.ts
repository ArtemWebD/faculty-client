import { useState } from 'react';

export const useValidate = () => {
  const [validated, setValidated] = useState(false);

  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return false;
    }
    return true;
  };

  return { validated, validate };
};