import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Realm from 'realm';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

const appId = 'carescheduler-ciszu'; // Set Realm app ID here.
const appConfig = {
  id: appId,
  timeout: 10000,
};

export function getRealmApp() {
  return new Realm.App(appConfig);
}

async function getAppleIdentityToken(): Promise<string | null> {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: AppleAuthRequestOperation.LOGIN,
    requestedScopes: [
      AppleAuthRequestScope.EMAIL,
      AppleAuthRequestScope.FULL_NAME,
    ],
  });
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );

  if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
    return appleAuthRequestResponse.identityToken;
  } else {
    throw new Error('Failed to get Apple ID token.');
  }
}

const AuthPage = ({ app }: { app: Realm.App }) => {
  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  return (
    <View>
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={styles.appleAuthButton}
        onPress={async () => {
          const identityToken = await getAppleIdentityToken();
          const credential = Realm.Credentials.apple(identityToken);
          const user: Realm.User = await app.logIn(credential);
          console.log(`Logged in with id: ${user.id}`);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appleAuthButton: {
    width: 160,
    height: 45,
  },
});

export default AuthPage;
