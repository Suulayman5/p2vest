import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import Layout from "src/components/Layout";
import { ArrowLeft4, searchNormal } from "assets/images/image-exports";

export default function FilterScreen() {
  const filters = [
    { icon: "funnel-outline", text: "Assigned to me", color: "text-gray-700" },
    { icon: "sparkles-outline", text: "Priority 1", color: "text-red-500", count: 1 },
    { icon: "flame-outline", text: "Priority 3", color: "text-yellow-500", count: 1 },
    { icon: "settings-outline", text: "Manage Filter", color: "text-gray-700" },
  ];

  const labels = [
    { icon: "pricetag-outline", text: "Masana label" },
    { icon: "settings-outline", text: "Manage labels" },
  ];

  const SectionItem = ({ icon, text, color, count }: any) => (
    <TouchableOpacity className="flex-row items-center justify-between py-3">
      <View className="flex-row items-center">
        <Ionicons name={icon as any} size={20} className={`${color}`} />
        <Text className="ml-3 text-gray-700">{text}</Text>
      </View>
      <View className="flex-row items-center">
        {count !== undefined && (
          <Text className="mr-3 text-gray-500">{count}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <View className="flex-row justify-between items-center mt-6 mb-2">
      <Text className="font-semibold text-gray-900">{title}</Text>
      <TouchableOpacity>
        <Feather name="plus" size={20} color="#1F2937" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Layout >
      <View className="flex-row items-center justify-between mb-5">
        <TouchableOpacity>
           <Image source={ArrowLeft4}/>
        </TouchableOpacity>
        <Text className="font-semibold text-textblack text-lg">Filter & Labels</Text>
        <TouchableOpacity>
         <Image source={searchNormal}/>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Filter your task */}
        <SectionHeader title="Filter your task" />
        {filters.map((f, i) => (
          <SectionItem key={i} {...f} />
        ))}

        {/* Labels */}
        <SectionHeader title="Labels" />
        {labels.map((l, i) => (
          <SectionItem key={i} {...l} />
        ))}
      </ScrollView>
    </Layout>
  );
}

// export default FilterScreen