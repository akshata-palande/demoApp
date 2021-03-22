import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default function Container({ children }) {
  return (
    <SafeAreaView style={Styles.ContainerStyle}>{children}</SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
    margin: 10
  }
})