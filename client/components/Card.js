// components/Card.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

/**
 * Tarjeta contenedora con sombra suave.
 *
 * Props:
 *  - children  {node}    Contenido interno
 *  - style     {object}  Estilos extra
 */
export default function Card({ children, style }) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
});