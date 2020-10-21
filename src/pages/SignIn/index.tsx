import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container,
         Title, 
         ForgotPassword, 
         ForgotPasswordText,
         CreateAccountButton,
         CreateAccountButtonText
    } from './styles';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
    return (
        <KeyboardAvoidingView 
            style={{flex: 1}}
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        >
            <ScrollView 
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1 }}
            >
                <Container>
                    <Image source={logoImg} />
                    <Title>Faça seu Login</Title>

                    <Input name='email' icon='mail' placeholder='E-mail' />
                    <Input name='password' icon='lock' placeholder='Password' />

                    <Button onPress={() => {console.log('click')}} >Entrar</Button>

                    <ForgotPassword>
                        <ForgotPasswordText>Reset Passoword</ForgotPasswordText>
                    </ForgotPassword>
                </Container>

                <CreateAccountButton onPress={() => {console.log('click')}}>
                    <Icon name="log-in" size={20} color="#ff9000" />
                    <CreateAccountButtonText>SignUp</CreateAccountButtonText>
                </CreateAccountButton>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignIn;