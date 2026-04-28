// components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/colors';

/**
 * Botón reutilizable de Chispapp.
 *
 * Props:
 *  - label      {string}   Texto del botón
 *  - onPress    {func}     Función al presionar
 *  - variant    {string}   'primary' | 'outline' | 'ghost'  (default: 'primary')
 *  - loading    {bool}     Muestra spinner si true
 *  - disabled   {bool}     Desactiva el botón
 *  - style      {object}   Estilos extra opcionales
 */

export default function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}) {
  const btnStyle = [
    styles.base,
    variant === 'primary' && styles.primary,
    variant === 'outline' && styles.outline,
    variant === 'ghost'   && styles.ghost,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.label,
    variant === 'outline' && styles.labelOutline,
    variant === 'ghost'   && styles.labelGhost,
  ];

  
  return (
    <TouchableOpacity
      style={btnStyle}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={label}
      activeOpacity={0.82}
    >
      {loading
        ? <ActivityIndicator color={variant === 'primary' ? Colors.white : Colors.primary} />
        : <Text style={textStyle}>{label}</Text>
      }
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  // Variante sólida (default)
  primary: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  // Variante borde
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  // Variante sin fondo
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  labelOutline: {
    color: Colors.primary,
  },
  labelGhost: {
    color: Colors.textMuted,
  },
});