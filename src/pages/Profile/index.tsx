import React, { useCallback, useRef } from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import * as yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { useAuth } from '../../hooks/auth';

import { 
    Container,
    Avatar,
    AvatarButton,
    Title,
} from './styles';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationsErrors';

interface IFormData {
    name: string;
    email: string;
    password: string;
    old_password: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {

    const { user, updateUser } = useAuth();

    const formRef = useRef<FormHandles>(null);

    const emailRef = useRef<TextInput>(null);
    const old_passwordRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirm_passwordRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const handleBackButton = useCallback(() => navigation.goBack(), [navigation]);

    const handleSubmitForm = useCallback(async(data: IFormData) => {
        try {

            const schema = yup.object().shape({
                name: yup.string().required(),
                email: yup.string().required().email(),
                old_password: yup.string(),
                password: yup.string().when('old_password', {
                    is: (val) => !!val.length,
                    then: yup.string().required(),
                    otherwise: yup.string()
                }),
                confirm_password: yup.string().when('password', {
                    is: (val) => !!val.length,
                    then: yup.string().required(),
                    otherwise: yup.string()
                }).oneOf([yup.ref('password')], 'Senhas não conferem'),
            });

            await schema.validate(data, { abortEarly: false });

            const { name, email, old_password, password, password_confirmation } = data;

            const formData = {
                name,
                email,
                ...(old_password ? { old_password, password, password_confirmation } : {})
            }

            const response = await api.put('profile', formData);

            updateUser(response.data);

            Alert.alert("Perfil atualizado com sucesso");

            navigation.goBack();

        } catch(err) {
            if(err instanceof yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);

                return
            }

            Alert.alert('Houve um erro ao realizar as alterações, tente novamente')
        }
    }, [navigation]);

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
            enabled
        >

            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1 }}
            >

                <Container>
                    <AvatarButton onPress={handleBackButton}>
                        <Avatar source={{ uri: user.avatar_url }} />
                    </AvatarButton>
                    <View>
                        <Title>Atualizar Perfil</Title>
                    </View>

                    <Form initialData={user} ref={formRef} onSubmit={handleSubmitForm} >
                        <Input 
                            name="name"
                            icon="user"
                            placeholder="Nome"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            onSubmitEditing={() => emailRef.current?.focus()}
                        />
                        <Input 
                            ref={emailRef}
                            name="email"
                            icon="mail"
                            placeholder="Email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            keyboardType="email-address"
                            onSubmitEditing={() => old_passwordRef.current?.focus()}
                        />
                        <View style={{marginBottom: 16}} ></View>
                        <Input
                            ref={old_passwordRef} 
                            name="old_password"
                            icon="lock"
                            placeholder="Senha atual"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            secureTextEntry
                            onSubmitEditing={() => passwordRef.current?.focus()}
                        />
                        <Input
                            ref={passwordRef} 
                            name="password"
                            icon="lock"
                            placeholder="Nova senha"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            secureTextEntry
                            onSubmitEditing={() => confirm_passwordRef.current?.focus()}
                        />
                        <Input
                            ref={confirm_passwordRef} 
                            name="password_confirmation"
                            icon="lock"
                            placeholder="Confirmar senha"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="send"
                            secureTextEntry
                            onSubmitEditing={() => formRef.current?.submitForm()}
                        />

                        <Button onPress={() => formRef.current?.submitForm()} >
                            Confirmar mudanças
                        </Button>
                    </Form>

                </Container>
        
            </ScrollView>

        </KeyboardAvoidingView>
    
    );
}

export default Profile;