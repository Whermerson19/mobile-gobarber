import React, { useCallback } from 'react';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button'

import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, } from './styles';
import { useNavigation } from '@react-navigation/native';

const Dashboard: React.FC = () => {

    const { signOut, user } = useAuth();

    const navigation = useNavigation();

    const navigateProfile = useCallback(() => {
        navigation.navigate('Profile');
    }, [navigation.navigate]);

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
            </Header>
        </Container>
    );
}

export default Dashboard;