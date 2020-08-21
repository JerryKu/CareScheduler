export interface IShiftList {
  _id?: string | number;
  date: Date | string;
  groupId: string;
}

export interface IShift {
  _id?: string | number;
  endTime: Date | string;
  startTime: Date | string;
  assigned?: string | number;
}
