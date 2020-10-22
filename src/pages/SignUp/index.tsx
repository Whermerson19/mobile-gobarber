import React, { useRef } from 'react';
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
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

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

                    <Form ref={formRef} onSubmit={(data) => {console.log(data)}} >

                    <Input name='nome' icon='user' placeholder='Name' />
                    <Input name='email' icon='mail' placeholder='E-mail' />
                    <Input name='password' icon='lock' placeholder='Password' />

                    <Button onPress={() => {formRef.current?.submitForm()}} >Register</Button>

                    </Form>

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