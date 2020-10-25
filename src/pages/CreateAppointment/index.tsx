import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import DateTimePicker from '@react-native-community/datetimepicker';

import { 
    Container, 
    Header, 
    BackButton, 
    HeaderTitle, 
    UserAvatar, 
    ProvidersList, 
    ProvidersListContainer,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    Calendar,
    Title,
    OpenCalendarButton,
    TextOpenCalendarButton,
} from './styles';
import { Platform } from 'react-native';


interface IRouteParams {
    providerId: string;
}

export interface IProviders {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
}

const CreateAppointment: React.FC = () => {

    const route = useRoute();
    const { providerId } = route.params as IRouteParams;
    const navigation = useNavigation()
    const { user } = useAuth();

    const [providers, setProviders] = useState<IProviders[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(providerId);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const navigateBack = useCallback(() => {
        navigation.navigate("Dashboard");
    }, [navigation.navigate]);


    useEffect(() => {
        api.get('providers').then(response => {
            return setProviders(response.data);
        });
    }, []);

    const handleSelectedProvider = useCallback((provider_id: string) => {
        setSelectedProvider(provider_id);
    }, []);

    const handleOpenCalendar = useCallback(() => {
        setShowCalendar(!showCalendar)
    }, [setShowCalendar]);

    const handleDateChange = useCallback((event: any, date: Date | undefined) => {
        if(Platform.OS === 'android'){
            setShowCalendar(false)
        }

        if(date) {
            setSelectedDate(date);
        }
    }, []);

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack} >
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireros</HeaderTitle>
                <UserAvatar source={{ uri: user.avatar_url }} />
            </Header>

            <ProvidersListContainer>
                <ProvidersList 

                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={providers}
                    keyExtractor={provider => provider.id}
                    renderItem={({ item: provider }) => (
                        <ProviderContainer
                        onPress={() => handleSelectedProvider(provider.id)}
                            selected={provider.id === selectedProvider}
                        >
                            <ProviderAvatar source={{ uri: provider.avatar_url }} />
                            <ProviderName 
                                selected={provider.id === selectedProvider} 
                            >
                                {provider.name}
                            </ProviderName>
                        </ProviderContainer>
                    )}
                />
            </ProvidersListContainer>

            <Calendar>
                <Title>Choose a date</Title>
                <OpenCalendarButton onPress={handleOpenCalendar} >
                    <TextOpenCalendarButton>Selecionar Data</TextOpenCalendarButton>
                </OpenCalendarButton>
                { showCalendar && (
                    <DateTimePicker 
                    mode="date"
                    display="calendar" 
                    value={selectedDate} 
                    onChange={handleDateChange}
                /> 
                ) }
            </Calendar>

        </Container>
    );
}

export default CreateAppointment;