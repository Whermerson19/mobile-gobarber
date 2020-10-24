import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button'

import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ProvidersList, } from './styles';
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

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data);
        });
    }, []);

    return (
        <>
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
            </Header>

            <ProvidersList 
                data={providers}
                keyExtractor={provider => provider.id}
                renderItem={({ item }) => (
                    <UserName> {item.name} </UserName>
                )}
            />
        </Container>
        <Button onPress={signOut} >
            X
        </Button>
        </>
    );
}

export default Dashboard;