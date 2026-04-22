import { View, Text, Button } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View>
      <Text>Bienvenido a Chispa</Text>
      <Button title="Comenzar" onPress={() => navigation.navigate('VAK')} />
    </View>
  );
}