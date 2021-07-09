import {useMemo, useState} from 'react';
import {Props} from '.';

export const useHooks = ({error, formType}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const errorToMessage = useMemo(() => {
    switch (error) {
      case 'email': {
        return formType === 'login'
          ? 'Email address in wrong'
          : 'There exist a user with this email address';
      }
      case 'password': {
        return formType === 'login' ? 'Password is wrong' : 'Password is invalid';
      }
      case 'nickname': {
        return 'There exist a user with this nickname address';
      }
    }
  }, [error, formType]);

  const handleEmailChange = (evt: any) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt: any) => {
    setPassword(evt.target.value);
  };

  const handleNicknameChange = (evt: any) => {
    setNickname(evt.target.value);
  };

  return {
    email,
    password,
    nickname,
    handleEmailChange,
    handlePasswordChange,
    handleNicknameChange,
    errorToMessage,
  };
};
