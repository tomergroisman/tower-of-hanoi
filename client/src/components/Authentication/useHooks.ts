import {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {Credentials, ErrorFields} from '../../store/types/app';
import {apiRequests} from '../../utils/api/requests';

import {Props} from '.';

export const useHooks = (props: Props) => {
  const [, setCookies] = useCookies(['token']);
  const [errors, setErrors] = useState<ErrorFields>();
  const [loading, setLoading] = useState(false);

  const _setTokenCookie = (token: string) => {
    const expires = new Date();
    expires.setMonth(new Date().getMonth() + 6);
    setCookies('token', token, {expires});
  };

  const handleSubmit = async (userData: Credentials) => {
    setLoading(true);
    try {
      if (props.screen === 'signup') {
        await apiRequests.createUser(userData);
      }
      const {token} = await apiRequests.getToken(userData);
      _setTokenCookie(token);
    } catch (e) {
      const errors: ErrorFields = e.response.data;
      setLoading(false);
      setErrors(errors);
    }
  };

  useEffect(() => {
    return setLoading(false);
  }, []);

  return {
    errors,
    loading,
    handleSubmit,
  };
};
