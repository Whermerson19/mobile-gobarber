import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';

import { Text } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button'

import {
    Container, 
    Header, 
    HeaderTitle, 
    UserName, 
    ProfileButton, 
    UserAvatar, 
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderInfo,
    ProviderName,
    ProviderMeta,
    ProviderMetaText,
    ProvidersListTitle,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export interface Providers {
    id: string;
    name: string;
    avatar_url: string;
}

const Dashboard: React.FC = () => {

    const [providers, setProviders] = useState<Providers[]>([]);

    const { signOut, user } = useAuth();

    const navigation = useNavigation();

    const navigateProfile = useCallback(() => {
        navigation.navigate('Profile');
    }, [navigation.navigate]);

    const navigateCreateAppointment = useCallback((providerId: string) => {
        navigation.navigate('CreateAppointment', { providerId })
    }, [navigation.navigate]);

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data);
        });
    }, []);

    return (
        
        <Container>
            <Header>
                <HeaderTitle>
                    Bem Vindo, {"\n"}
                    <UserName>
                        {user.name}
                    </UserName>
                </HeaderTitle>

                <ProfileButton onPress={navigateProfile} >
                    <UserAvatar source={{ uri: user.avatar_url }} />
                </ProfileButton>
                {/* <Button onPress={signOut} >sair</Button> */}
            </Header>

            <ProvidersList 
                data={providers}
                keyExtractor={provider => provider.id}
                ListHeaderComponent={
                    <ProvidersListTitle>
                        Cabeleileiros
                    </ProvidersListTitle>
                }
                renderItem={({ item: provider }) => (
                    <ProviderContainer onPress={() => navigateCreateAppointment(provider.id)}>
                        <ProviderAvatar source={{ uri: provider.avatar_url }} />
                        <ProviderInfo>
                            <ProviderName>{provider.name}</ProviderName>
                            <ProviderMeta>
                            <Icon name="calendar" size={14} color="#ff9000" />
                            <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                            </ProviderMeta>
                            <ProviderMeta>
                            <Icon name="clock" size={14} color="#ff9000" />
                            <ProviderMetaText>8h às 18h</ProviderMetaText>
                            </ProviderMeta>
                        </ProviderInfo>
                    </ProviderContainer>
                  )}
            />
        </Container>
    );
}

export default Dashboard;