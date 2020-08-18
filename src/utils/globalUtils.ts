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
  const selectedGroup = (await AsyncStorage.getItem('groupId')) || undefined;
  return selectedGroup;
};
