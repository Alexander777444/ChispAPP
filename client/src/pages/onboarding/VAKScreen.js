import { View, Text, Button } from 'react-native';

export default function VAKScreen({ navigation }) {
  return (
    <View>
      <Text>Encuesta VAK</Text>
      <Button title="Continuar" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}