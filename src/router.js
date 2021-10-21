
import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home';
import Login from './screens/login';

const Stack = createNativeStackNavigator();

function App() {

    const userLogin = useSelector((state) => state?.userReducer?.user) ?? null;
    return (
        <NavigationContainer>
            {userLogin ?
                <Stack.Navigator >
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                </Stack.Navigator> :
                <Stack.Navigator >
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                </Stack.Navigator>
            }
        </NavigationContainer>
    );
};

export default App;