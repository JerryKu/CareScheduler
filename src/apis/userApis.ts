import axios from 'axios';
import { AppleUser } from '@interfaces/AppleUser';

export const getOrCreateNewAppleUser = async ({
  firstName,
  lastName,
  email,
  appleUserId,
  identityToken,
}: AppleUser) => {
  try {
    const res = await axios.post('/User', {
      firstName,
      lastName,
      email,
      appleUserId,
      identityToken,
    });
    if (res.data) {
      return res.data;
    } else {
      throw new Error('Error creating Apple User');
    }
  } catch (e) {
    console.log('Error: ', e);
  }
};
