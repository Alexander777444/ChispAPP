import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../pages/onboarding/WelcomeScreen';
import VAKScreen from '../pages/onboarding/VAKScreen';
import HomeScreen from '../home/HomeScreen';
import SubjectsScreen from '../../subjects/SubjectsScreen';
import ProgressScreen from '../../progress/ProgressSreen';

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