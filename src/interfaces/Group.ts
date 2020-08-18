export interface IGroup {
  groupName: string;
  users: [];
  shiftLists: [];
  ownerId: string;
  _id: string;
}

export interface IGroupList {
  groupsOwned: IGroup[];
  groupsMemberOf: IGroup[];
}
