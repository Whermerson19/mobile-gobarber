import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AppointmentCreated from '../pages/AppointmentCreated';
import CreateAppointment from '../pages/CreateAppointment';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {

    return (
        <App.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#312e38' } }} >
            <App.Screen name="Dashboard" component={Dashboard} />
            <App.Screen name="Profile" component={Profile} />
            <App.Screen name="CreateAppointment" component={CreateAppointment} />
            <App.Screen name="AppointmentCreated" component={AppointmentCreated} />
        </App.Navigator>
    );
}

export default AppRoutes;