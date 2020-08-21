import AsyncStorage from '@react-native-community/async-storage';

export const getUserId = async () => {
  const user = JSON.parse((await AsyncStorage.getItem('userData')) || '{}');
  return user._id;
};

export const getUserData = async () => {
  const user = JSON.parse((await AsyncStorage.getItem('userData')) || '{}');
  return user;
};
export const getGroupId = async () => {
  const selectedGroupId = (await AsyncStorage.getItem('groupId')) || undefined;
  return selectedGroupId;
};

export const getShiftListId = async () => {
  const selectedShiftList =
    (await AsyncStorage.getItem('shiftListId')) || undefined;
  return selectedShiftList;
};
