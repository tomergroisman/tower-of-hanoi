import {useEffect, useState} from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useDispatch} from 'react-redux';

import {Credentials, ErrorFields} from '../../store/types/app';
import {apiRequests} from '../../utils/api/requests';
import {setUser} from '../../store/actions/app';
import {fetchUser} from '../../utils/api/fetch';

import {Props} from '.';

export const useHooks = (props: Props) => {
  const [, setCookies] = useCookies(['token']);
  const dispatch = useDispatch();
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
      const user = await fetchUser(token);
      dispatch(setUser(user));
    } catch (e) {
      let errors: ErrorFields = {};
      if (axios.isAxiosError(e)) {
        errors = e.response?.data;
      }
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
