import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import Icon from 'react-native-vector-icons/Feather';

import { Container, Title, Description, OkButton, OkButtonText } from './styles';

const AppointmentCreated: React.FC = () => {

    const navigation = useNavigation();

    const handleOkPress = useCallback(() => {
        navigation.reset({
            routes: [
                { name: "Dashboard" }
            ],
            index: 0
        })
    }, [navigation.reset]);

    return (
        <Container>
            <Icon name="check" size={80} color="#04d361" />
            <Title>Agendamento Concluido</Title>
            <Description>descrição</Description>

            <OkButton onPress={handleOkPress} >
                <OkButtonText>OK</OkButtonText>
            </OkButton>
        </Container>
    );
}

export default AppointmentCreated;