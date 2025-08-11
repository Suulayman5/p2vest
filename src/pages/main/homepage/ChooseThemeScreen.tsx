import Layout from 'src/components/Layout';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from 'src/context/themeContext';
import { Check } from 'assets/images/image-exports';
import { scaledSize } from 'utils';

const colors = [
  { name: 'teal', hex: '#24A19C' },
  { name: 'black', hex: '#1A1A1A' },
  { name: 'red', hex: '#F44336' },
  { name: 'blue', hex: '#1E88E5' },
];

export default function ChooseThemeScreen({ navigation }) {
  const { primary, setPrimary } = useTheme();

  return (
    <Layout>
      <View className="flex-1">
        <Text className="text-textbold text-2xl font-semibold mt-6">Create to do list</Text>
        <Text className="text-sm font-semibold text-text mt-3">Choose your to do list color theme:</Text>

        <View className="mt-6 ">
          {colors.map((color) => {
            const isSelected = primary === color.hex;
            return (
              <TouchableOpacity
                key={color.name}
                onPress={() => setPrimary(color.hex)}
                className={`relative my-3 rounded-t-2xl shadow ${
                  isSelected ? 'border-0' : 'border-0'
                }`}
                style={{
                  borderColor: isSelected ? color.hex : 'transparent',
                }}>
                {/* Floating check icon */}
                {primary === color.hex && (
                  <View
                    className="absolute z-10 items-center justify-center"
                    style={{
                      top: -10, // pull slightly above
                      left: -16, // pull slightly left
                      backgroundColor: color.hex,
                      width: 32,
                      height: 32,
                      borderRadius: 50,
                    }}>
                    <Image
                      source={Check}
                      style={{
                        width: 12,
                        height: 12,
                        tintColor: 'white', // ensures white icon
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                )}

                {/* Color bar */}
                <View style={{ backgroundColor: color.hex, height: scaledSize(36), borderTopLeftRadius: scaledSize(8),borderTopRightRadius: scaledSize(8) }} />

                {/* Placeholder white section */}
                <View className="bg-white p-5">
                  <View className="mb-2 h-3 w-3 rounded-full bg-gray-300" />
                  <View className="mb-1 h-2 w-40 rounded bg-gray-200" />
                  <View className="h-2 w-28 rounded bg-gray-200" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Button */}
        <TouchableOpacity
          className="mt-auto rounded-xl py-4"
          style={{ backgroundColor: primary }}
          onPress={() => navigation.navigate('Main')}>
          <Text className="text-center font-semibold text-lg text-white">Open Todyapp</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
