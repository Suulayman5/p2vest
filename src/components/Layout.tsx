import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { defaultTo } from 'lodash';
import { scaledSize } from '../../utils';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* inner preserves full height so children can use flex positioning */}
      <View style={styles.inner}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === 'ios'
        ? defaultTo(StatusBar.currentHeight, 0) + scaledSize(8)
        : defaultTo(StatusBar.currentHeight, 0),
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    paddingHorizontal: scaledSize(24), // equivalent to px-6
    paddingVertical: scaledSize(16),   // equivalent to py-4
  },
});
