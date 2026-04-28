// components/QuestionCard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

/**
 * Tarjeta de pregunta para el quiz VAK y lecciones.
 *
 * Props:
 *  - question   {string}    Texto de la pregunta
 *  - options    {Array}     [{ label: string, value: string, emoji: string }]
 *  - onSelect   {func}      Callback con el value seleccionado
 */

export default function QuestionCard({ question, options, onSelect }) {
  const [selected, setSelected] = useState(null);

  const handlePress = (value) => {
    setSelected(value);

    // Pequeño delay para que el usuario vea el highlight antes de avanzar
    setTimeout(() => onSelect(value), 300);
  };


// React Native no soporta gap en View, así que usamos margin para simularlo
return (
    <View style={styles.container}>
    <Text style={styles.question}>{question}</Text>

    <View style={styles.options}>
        {options.map((opt) => (
        <TouchableOpacity
            key={opt.value}
            style={[
            styles.option,
            selected === opt.value && styles.optionSelected,
            ]}
            onPress={() => handlePress(opt.value)}
            accessibilityRole="radio"
            accessibilityLabel={opt.label}
            activeOpacity={0.75}
        >
            <Text style={styles.optionEmoji}>{opt.emoji}</Text>
            <Text style={[
                styles.optionLabel,
                selected === opt.value && styles.optionLabelSelected,
            ]}>
                {opt.label}
            </Text>
        </TouchableOpacity>
        ))}
    </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 4,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.bg,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  optionSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.primary,
  },
  optionEmoji: {
    fontSize: 24,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  optionLabelSelected: {
    color: Colors.primary,
  },
});