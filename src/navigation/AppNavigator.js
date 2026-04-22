import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadow } from '../constants/theme';
import DeliveryScreen from '../screens/DeliveryScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import OrderScreen from '../screens/OrderScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#B8ACA3',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          left: 18,
          right: 18,
          bottom: 18,
          height: 70,
          borderRadius: 24,
          borderTopWidth: 0,
          backgroundColor: colors.surface,
          ...shadow,
        },
        tabBarIcon: ({ color, focused, size }) => {
          if (route.name === 'HomeTab') {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === 'FavoritesTab') {
            return (
              <Ionicons
                name={focused ? 'heart' : 'heart-outline'}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === 'OrderTab') {
            return (
              <Ionicons
                name={focused ? 'bag-handle' : 'bag-handle-outline'}
                size={size}
                color={color}
              />
            );
          }

          return (
            <Ionicons
              name={focused ? 'notifications' : 'notifications-outline'}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="FavoritesTab" component={FavoritesScreen} />
      <Tab.Screen name="OrderTab" component={OrderScreen} />
      <Tab.Screen name="NotificationsTab" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Delivery" component={DeliveryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
