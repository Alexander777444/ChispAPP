import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import VAKScreen from '../screens/onboarding/VAKScreen';
import HomeScreen from '../screens/home/HomeScreen';
import SubjectsScreen from '../screens/subjects/SubjectsScreen';
import ProgressScreen from '../screens/progress/ProgressScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="VAK" component={VAKScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Subjects" component={SubjectsScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}