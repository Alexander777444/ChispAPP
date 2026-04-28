import { View, Text, Button } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View>
      <Image source={require('../../../assets/PrimerLogoChispapp.png')} /> //FOTO PRINCIPAL
      <Text>Chispa</Text>
      <Button title="Comenzar" onPress={() => navigation.navigate('VAK')} />
    </View>
  );
}