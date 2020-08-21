export interface IUser {
  _id: string | number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}

export interface IAppleUser extends Omit<IUser, '_id'> {
  appleUserId: string | null;
  identityToken: string | null;
}
