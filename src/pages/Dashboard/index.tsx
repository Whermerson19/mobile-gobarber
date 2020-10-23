import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button'

const Dashboard: React.FC = () => {

    const { signOut } = useAuth();

    return (
        <View>
            <Text>Dashboard</Text>
            <Button onPress={ signOut } >quit</Button>
        </View>
    );
}

export default Dashboard;