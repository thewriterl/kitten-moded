import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import { ArrowForwardIcon, FacebookIcon, GoogleIcon, TwitterIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import axios from 'axios'

export default ({ navigation }): React.ReactElement => {

  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const alertFormInvalid = (): void => {
    Alert.alert('Invalid Form', 'Please review your information', [ 
      { text: 'Ok', onPress: () => console.log("pressed") }
    ]);
  }


  const validateForm = (): void => {
    if (
      email === undefined || email === null || email === '' ||
      password === undefined || password === null || password === '') {
        return alertFormInvalid();
    } else {
      const form = {username: email, password: password, rememberMe: true}
      axios.post('https://dev.magazine.b2t.com.br/api/authenticate', form).then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
        
        Alert.alert(err.status, 'Failed to autenticate', [ 
          { text: 'Ok', onPress: () => console.log("ok") }
        ])
      })
    }
  }

  const onSignInButtonPress = (): void => {
    // navigation && navigation.goBack();
    return validateForm()
  };

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp1');
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require('./assets/logo-whit.png')}>
        <View style={styles.signInContainer}>
          <Text
            style={styles.signInLabel}
            status='control'
            category='h4'>
            SIGN IN
          </Text>
          <Button
            style={styles.signUpButton}
            appearance='ghost'
            status='control'
            size='giant'
            icon={ArrowForwardIcon}
            onPress={onSignUpButtonPress}>
            Sign Up
          </Button>
        </View>
        <View style={styles.formContainer}>
          <Input
            label='EMAIL'
            placeholder='Email'
            status='control'
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            secureTextEntry={true}
            placeholder='Password'
            label='PASSWORD'
            status='control'
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Button
          status='control'
          size='large'
          onPress={onSignInButtonPress}>
          SIGN IN
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text
            style={styles.socialAuthHintText}
            status='control'>
            Sign with a social account
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              size='giant'
              status='control'
              icon={GoogleIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              status='control'
              icon={FacebookIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              status='control'
              icon={TwitterIcon}
            />
          </View>
        </View>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: 'black',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  socialAuthContainer: {
    marginTop: 48,
  },
  evaButton: {
    maxWidth: 72,
    paddingHorizontal: 0,
  },
  formContainer: {
    flex: 1,
    marginTop: 48,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInLabel: {
    flex: 1,
  },
  signUpButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});


