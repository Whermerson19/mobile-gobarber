import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { View, Text, StatusBar } from 'react-native';

import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#312e38" />
            <View style={{ flex: 1, backgroundColor: '#312e38' }} >
                <AppProvider>
                    <Routes/>
                </AppProvider>
            </View>
        </NavigationContainer>
    )
}

export default App;