import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {  } from 'date-fns';

import DateTimePicker from '@react-native-community/datetimepicker';

import { 
    Container, 
    Header, 
    BackButton, 
    HeaderTitle, 
    UserAvatar, 
    Content,
    ProvidersList, 
    ProvidersListContainer,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    Calendar,
    Title,
    OpenCalendarButton,
    TextOpenCalendarButton,
    Schedule,
    Section,
    SectionTitle,
    SectionContent,
    Hour,
    HourText,
} from './styles';
import { Platform } from 'react-native';
import { format } from 'date-fns/esm';

interface IRouteParams {
    providerId: string;
}

export interface IProviders {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
}

interface IAvailabilityItem {
    hour: number;
    available: boolean;
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
    const [availability, setAvailability] = useState<IAvailabilityItem[]>([]);
    const [selectedHour, setSelectedHour] = useState(0);

    const navigateBack = useCallback(() => {
        navigation.navigate("Dashboard");
    }, [navigation.navigate]); 


    useEffect(() => {
        api.get('providers').then(response => {
            return setProviders(response.data);
        });
    }, []);

    useEffect(() => {
        api.get(`/providers/${selectedProvider}/day-availability`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate()
            }
        }).then(response => {
            setAvailability(response.data)
        });
    }, [selectedDate, selectedProvider]);


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

   const handleSelectHour = useCallback((hour: number) => {
        setSelectedHour(hour);
   }, []);



    const afternoonAvailability = useMemo(() => {
        return availability.filter(({ hour, available }) =>  hour >= 12 ).map(({ hour, available }) => {
                    return {
                        hour,
                        available,
                        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
                    }
                })
    }, [availability]);

    const morningAvailability = useMemo(() => {
        return availability.filter(({ hour }) =>  hour < 12 ).map(({ hour, available }) => {
                    return {
                        hour,
                        available,
                        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
                    }
                })
    }, [availability]);


    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack} >
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireros</HeaderTitle>
                <UserAvatar source={{ uri: user.avatar_url }} />
            </Header>

            <Content>
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
                    <Title>Selecione uma data</Title>
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

                <Schedule>
                    <Title>Escolha um Horário</Title>

                    <Section>
                        <SectionTitle>Manhã</SectionTitle>

                        <SectionContent>
                            { morningAvailability.map(({ hourFormatted, available, hour }) => (
                                <Hour 
                                    key={hourFormatted} 
                                    available={available} 
                                    onPress={() => handleSelectHour(hour)}
                                    selected={selectedHour === hour}
                                >
                                    <HourText available={available} selected={selectedHour === hour} >{hourFormatted}</HourText>
                                </Hour>
                            )) }
                        </SectionContent>
                    </Section>

                    <Section>
                        <SectionTitle>Tarde</SectionTitle>

                        <SectionContent>
                            { afternoonAvailability.map(({ hourFormatted, available, hour }) => (
                                <Hour 
                                    key={hourFormatted} 
                                    available={available} 
                                    onPress={() => handleSelectHour(hour)}
                                    selected={selectedHour === hour}
                                >
                                    <HourText available={available} selected={selectedHour === hour} >{hourFormatted}</HourText>
                                </Hour>
                            )) }
                        </SectionContent>
                    </Section>
                </Schedule>
            </Content>

        </Container>
        
    );
}

export default CreateAppointment;