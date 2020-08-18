import axios from 'axios';
import { IAppleUser } from '@interfaces/AppleUser';
import { IShiftList } from '@interfaces/Shift';

export const getOrCreateNewAppleUser = async ({
  firstName,
  lastName,
  email,
  appleUserId,
  identityToken,
}: IAppleUser) => {
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

export const getUsersGroupListByUserId = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const res = await axios.get(`/Group/user/${userId}`);
    if (res.data) {
      return res.data;
    } else {
      throw new Error('Error getting Group List By UserId');
    }
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const getGroupByGroupId = async ({ groupId }: { groupId: string }) => {
  try {
    const res = await axios.get(`/Group/${groupId}`);
    if (res.data) {
      return res.data;
    } else {
      throw new Error('Error getting Group By Id');
    }
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const addNewShiftList = async ({ date, groupId }: IShiftList) => {
  try {
    const res = await axios.post('/ShiftList', {
      date,
      groupId,
    });
    if (res.data) {
      return res.data;
    } else {
      throw new Error('Error creating New Shift List');
    }
  } catch (e) {
    console.log('Error: ', e);
  }
};

export const getShiftListsByGroupId = async ({
  groupId,
}: {
  groupId: string;
}) => {
  try {
    const res = await axios.get(`/ShiftList/group/${groupId}`);
    console.log(res);
    if (res.data) {
      return res.data;
    } else {
      throw new Error('Error getting Group By Id');
    }
  } catch (e) {
    console.log(e);
    return {};
  }
};
