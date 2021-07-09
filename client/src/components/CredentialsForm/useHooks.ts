import {useState} from 'react';

export const useHooks = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

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
  };
};
