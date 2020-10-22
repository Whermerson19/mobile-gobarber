import React, { useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Form } from '@unform/mobile';

import { Container,
         Title, 
         ForgotPassword, 
         ForgotPasswordText,
         CreateAccountButton,
         CreateAccountButtonText
    } from './styles';

import logoImg from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const handleSubmit = useCallback((data: object) => {
        console.log(data);
    }, []);

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

                    <Form ref={formRef} onSubmit={handleSubmit} >

                        <Input name='email' icon='mail' placeholder='E-mail' />
                        <Input name='password' icon='lock' placeholder='Password' />

                        <Button onPress={() => formRef.current?.submitForm()} >Entrar</Button>

                    </Form>

                    <ForgotPassword>
                        <ForgotPasswordText>Reset Passoword</ForgotPasswordText>
                    </ForgotPassword>
                </Container>

                <CreateAccountButton onPress={() => navigation.navigate("SignUp")}>
                    <Icon name="log-in" size={20} color="#ff9000" />
                    <CreateAccountButtonText>SignUp</CreateAccountButtonText>
                </CreateAccountButton>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignIn;