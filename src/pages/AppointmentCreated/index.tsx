import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/Feather';

import { Container, Title, Description, OkButton, OkButtonText } from './styles';

interface IParams {
    date: number;
}

const AppointmentCreated: React.FC = () => {

    const navigation = useNavigation();
    const { params } = useRoute();

    const routeParams = params as IParams;

    const formattedDate = useMemo(() => {
        return format(routeParams.date, "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", { locale: ptBr })
    }, [routeParams.date]);

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
            <Description>{formattedDate}</Description>

            <OkButton onPress={handleOkPress} >
                <OkButtonText>OK</OkButtonText>
            </OkButton>
        </Container>
    );
}

export default AppointmentCreated;