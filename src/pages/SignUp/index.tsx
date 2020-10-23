import React, { useCallback, useRef } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';

import api from '../../services/api';

import * as yup from 'yup';

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
import getValidationErrors from '../../utils/getValidationsErrors';

interface ISignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const handleSubmit = useCallback(async(data: ISignUpFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = yup.object().shape({
                name: yup.string().required('required field'),
                email: yup.string().required('required field').email('invalid email format'),
                password: yup.string().min(6, 'minimum of 6 characteres'),
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('/users', data);

            Alert.alert('Successful registration')
            navigation.navigate('SignIn');
        } catch(err) {
            if(err instanceof yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors)
                return;
            }

            Alert.alert('Error when registering, check the field entered, and try again')
        }
    }, [navigation]);

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

                    <Form ref={formRef} onSubmit={handleSubmit} >

                    <Input 
                        name='name' 
                        icon='user' 
                        placeholder='Name'
                        autoCorrect={false}
                        autoCapitalize="none"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            emailInputRef.current?.focus()
                        }}
                    />

                    <Input 
                        ref={emailInputRef}
                        name='email' 
                        icon='mail' 
                        placeholder='E-mail'
                        autoCorrect={false}
                        autoCapitalize="none"
                        returnKeyType="next"
                        keyboardType="email-address"
                        onSubmitEditing={() => {
                            passInputRef.current?.focus()
                        }}
                    />

                    <Input 
                        ref={passInputRef}
                        secureTextEntry 
                        name='password' 
                        icon='lock' 
                        placeholder='Password'
                        returnKeyType="send"
                        onSubmitEditing={() => formRef.current?.submitForm()}
                    />

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