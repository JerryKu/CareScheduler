import Realm from 'realm';

// Returns the shared instance of the Realm app.
export function getRealmApp() {
  const appId = 'carescheduler-ciszu'; // Set Realm app ID here.
  const appConfig = {
    id: appId,
    timeout: 10000,
  };
  return new Realm.App(appConfig);
}

export async function openRealm(user: Realm.User) {
  let realm;
  try {
    // ...
    console.log(`Logged in with the user: ${user.id}`);
    const config = {
      sync: {
        user: user,
        partitionValue: 'myPartition',
      },
    };

    realm = await Realm.open(config);
    return realm;
  } catch (error) {
    throw `Error opening realm: ${JSON.stringify(error, null, 2)}`;
  }
}
