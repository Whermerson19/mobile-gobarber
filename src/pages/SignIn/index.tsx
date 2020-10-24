import React, { useCallback, useRef } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';

import * as yup from 'yup';

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
import getValidationErrors from '../../utils/getValidationsErrors';
import { useAuth } from '../../hooks/auth';

interface ISignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {

    
    const formRef = useRef<FormHandles>(null);
    const passInputRef = useRef<TextInput>(null);
    
    const { signIn } = useAuth();
    const navigation = useNavigation();

    const handleSubmit = useCallback(async(data: ISignInFormData) => {
        try {

            formRef.current?.setErrors({});

            const schema = yup.object().shape({
                email: yup.string().required('required field').email('invalid email format'),
                password: yup.string().required('required field'),
            });

            await schema.validate(data, { abortEarly: false });

            await signIn({
                email: data.email,
                password: data.password
            });

            Alert.alert('Login successful');
        } catch(err) {
            if(err instanceof yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
                return;
            }

            // Alert.alert('Login failed')
        }
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

                        <Input 
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            name='email' 
                            icon='mail' 
                            placeholder='E-mail' 
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                passInputRef.current?.focus()
                            }}
                        />

                        <Input 
                            ref={passInputRef}
                            secureTextEntry
                            autoCapitalize="none"
                            name='password' 
                            icon='lock' 
                            placeholder='Password' 
                            returnKeyType="send"
                            onSubmitEditing={() => {formRef.current?.submitForm()}}
                        />

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