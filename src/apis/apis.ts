import axios from 'axios';
import { IAppleUser } from '@interfaces/User';
import { IShiftList, IShift } from '@interfaces/Shift';

export const getOrCreateNewAppleUserApi = async ({
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

// Get all group lists that a user is in
export const getUsersGroupListByUserIdApi = async ({
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
    return {};
  }
};

// Get all users Ids in a Group
export const getUsersInGroupApi = async ({ groupId }: { groupId: string }) => {
  try {
    const res = await axios.get(`/User/group/${groupId}`);
    if (res.data) {
      return res.data;
    } else {
      throw new Error('Error getting Users in Group');
    }
  } catch (e) {
    return [];
  }
};

export const getUserObjByUserIdApi = async ({
  userId,
}: {
  userId: string | number;
}) => {
  try {
    const res = await axios.get(`/User/${userId}`);
    if (res.data) {
      return res.data;
    } else {
      throw new Error('Error getting Users in Group');
    }
  } catch (e) {
    return [];
  }
};

export const getGroupByGroupIdApi = async ({
  groupId,
}: {
  groupId: string;
}) => {
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

export const addNewShiftListApi = async ({ date, groupId }: IShiftList) => {
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

export const getShiftListsByGroupIdApi = async ({
  groupId,
}: {
  groupId: string;
}) => {
  try {
    const res = await axios.get(`/ShiftList/group/${groupId}`);
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

export const getShiftListByGroupIdAndDateApi = async ({
  groupId,
  date,
}: {
  groupId: string;
  date: string;
}) => {
  try {
    const res = await axios.post(`/ShiftList/group/${groupId}`, { date });
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

export const getShiftsByShiftListIdApi = async ({
  shiftListId,
}: {
  shiftListId: string;
}) => {
  try {
    const res = await axios.get(`/Shift/shiftList/${shiftListId}`);
    if (res.data) {
      return res.data;
    } else {
      throw new Error('Error getting Group By Id');
    }
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const addNewShiftApi = async (
  shiftListId: string,
  { endTime, startTime, assigned }: IShift,
) => {
  try {
    const res = await axios.post('/Shift', {
      shiftListId,
      endTime,
      startTime,
      assigned,
    });
    if (res.data) {
      return res.data;
    } else {
      throw new Error('Error Adding New Shift');
    }
  } catch (e) {
    console.log('Error: ', e);
  }
};

export const updateShiftApi = async (
  shiftId: string | number,
  { endTime, startTime, assigned }: IShift,
) => {
  try {
    const res = await axios.put(`/Shift/${shiftId}`, {
      startTime,
      endTime,
      assigned,
    });
    if (res.data) {
      console.log(res.data);
      return res.data;
    } else {
      throw new Error('Error Updating Shift');
    }
  } catch (e) {
    console.log('Error: ', e);
  }
};
