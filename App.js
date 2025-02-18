import React from 'react';
import { Alert, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, signOut } from 'firebase/auth';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ReportScreen from './screens/ReportScreen';
import AdminScreen from './screens/AdminScreen';
import CollectionPointsScreen from './screens/CollectionPointsScreen';
import RegisterScreen from './screens/RegisterScreen';

const auth = getAuth();

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const LogoutScreen = ({ navigation }) => {
  React.useEffect(() => {
    Alert.alert(
      "Tem certeza?",
      "Você deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => navigation.goBack(),
        },
        {
          text: "Sim, sair",
          onPress: () => {
            signOut(auth)
              .then(() => navigation.replace('Login'))
              .catch((error) => console.error('Erro ao fazer logout:', error));
          },
        },
      ]
    );
  }, []);

  return <View style={styles.container} />;
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#2C6B2F',
        tabBarStyle: { backgroundColor: '#1B5E20' },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Image source={require('./assets/reciclagem.png')} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Pontos de Coleta"
        component={CollectionPointsScreen}
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Image source={require('./assets/vassoura.png')} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Denúncias"
        component={ReportScreen}
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Image source={require('./assets/ecobag.png')} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Image source={require('./assets/reciclagem.png')} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: '#2E7D32' },
        drawerActiveTintColor: '#A5D6A7',
        drawerInactiveTintColor: '#fff',
      }}
    >
      <Drawer.Screen name="EcoMarabá" component={MainTabs} />
      <Drawer.Screen name="Admin" component={AdminScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
        <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//vendi minha alma pro demonio pra isso da certo mas eu conseguiiiii :D

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5D6A7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
