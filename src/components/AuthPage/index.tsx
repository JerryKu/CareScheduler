import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getOrCreateNewAppleUser } from '@apis/apis';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

async function signInWithApple(): Promise<void> {
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
    try {
      const { fullName, email, user, identityToken } = appleAuthRequestResponse;
      const userData = await getOrCreateNewAppleUser({
        firstName: (fullName && fullName.givenName) || null,
        lastName: (fullName && fullName.familyName) || null,
        appleUserId: user,
        email,
        identityToken,
      });
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.log('Something went wrong', error);
    }
  } else {
    throw new Error('Failed to get Apple ID token.');
  }
}

const AuthPage = ({ setLoggedIn }: { setLoggedIn: Function }) => {
  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
      try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
      } catch (error) {
        console.error('Error clearing app data.');
      }
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  return (
    <View>
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={styles.appleAuthButton}
        onPress={async () => {
          try {
            await signInWithApple();
            setLoggedIn(true);
          } catch (e) {
            console.log(e);
          }
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
