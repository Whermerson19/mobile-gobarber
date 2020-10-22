import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useNavigation } from '@react-navigation/native';

import { Container,
         Title, 
        BackToLogIn,
        BackToLogInText
    } from './styles';

import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {

    const navigation = useNavigation();

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
                    <Title>Sign Up</Title>

                    <Input name='nome' icon='user' placeholder='Name' />
                    <Input name='email' icon='mail' placeholder='E-mail' />
                    <Input name='password' icon='lock' placeholder='Password' />

                    <Button onPress={() => {console.log('click')}} >Entrar</Button>

                </Container>

                <BackToLogIn onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="#fff" />
                    <BackToLogInText>Log In</BackToLogInText>
                </BackToLogIn>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignUp;