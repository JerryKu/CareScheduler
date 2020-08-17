import React, { useEffect } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { getOrCreateNewAppleUser } from '@apis/userApis';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
  AppleAuthRequestResponse,
} from '@invertase/react-native-apple-authentication';
import { Actions } from 'react-native-router-flux';

// const user = {
//   authorizationCode:
//     'c02ccade913064d749e18511115a09d67.0.nuxy.VAHqVi1vGV2bPE3HMlhgLg',
//   authorizedScopes: [],
//   email: null,
//   fullName: {
//     familyName: null,
//     givenName: null,
//     middleName: null,
//     namePrefix: null,
//     nameSuffix: null,
//     nickname: null,
//   },
//   identityToken:
//     'eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmplcnJ5a3UuY2FyZXNjaGVkdWxlci1hcHAiLCJleHAiOjE1OTc2NjA5OTcsImlhdCI6MTU5NzY2MDM5Nywic3ViIjoiMDAwNDc4LjU2NzY1ZDFiMzdkMzQ2NmVhMjNmZDc3NWUxMjc1MTUzLjE0MDgiLCJub25jZSI6IjMyNDQxZWNlOTZlZjlhNTVhN2UyMDAwNmI2YTk1MTk4MDI1YzZmNGQzYTRmZmFjYTJjZjQwNzM4MWViYTg1ZDgiLCJjX2hhc2giOiJUTUtyVElVaUsweE5jNmZhb2ZjanlBIiwiZW1haWwiOiJvb2pheWtheW9vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImF1dGhfdGltZSI6MTU5NzY2MDM5Nywibm9uY2Vfc3VwcG9ydGVkIjp0cnVlfQ.OhmsJ7xyxRqFmXlD92FPmssEYERhKbr3wWBpHqb83yt5WHxJSnQQmux-2DeecnEOD6idF7C5fuIMF9ckpyetfDJFc05YBOMo9cMNcXB6LEacrNRL_CzEv10lg2wjtWpd2NUNZm2Uk-mEZtNEcS359fVqSRRgJPTdCxbIOoqSQd2JQcmM8TZfW6a3zaQqBY7vxPniQO8yo8vfDFf4Rr4yhB99pSaJ6prahiM30MM188g7Z8Sekt0qyJhC73Lygj_QI-Wd36BrXObUEowLCiOGKxJuqwh8uUV-VrCB4jaNRM4oK3gnRrMATiE2Mbx_gHBBfPvczu2S60TFlZELHFQy5Q',
//   nonce: 'n8j6nAwZ8tijHapfJOxYrJKBopOej6D-',
//   realUserStatus: 1,
//   state: null,
//   user: '000478.56765d1b37d3466ea23fd775e1275153.1408',
// };

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
      if (appleAuthRequestResponse.email) {
        await createNewAppleUserAction(appleAuthRequestResponse);
      }
      const appleUserId = appleAuthRequestResponse.user;
      const identityToken = appleAuthRequestResponse.identityToken;
      console.log(identityToken);
      const userData = await getOrCreateNewAppleUser({
        appleUserId,
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

async function createNewAppleUserAction(
  appleAuthInfo: AppleAuthRequestResponse,
): Promise<void> {
  try {
    const { fullName, email, user } = appleAuthInfo;
    await createNewAppleUser({
      firstName: (fullName && fullName.givenName) || null,
      lastName: (fullName && fullName.familyName) || null,
      email,
      appleUserId: user,
    });
  } catch (e) {
    console.log('Error Creating Apple User', e);
  }
}

const AuthPage = () => {
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
          try {
            await signInWithApple();
            Actions.home();
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
