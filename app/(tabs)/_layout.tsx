import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(home)"  options={{headerShown:false ,title:'فهرست سوره ها' }} />
      {/* <Tabs.Screen name="about" options={{ headerTitle: "About" }} /> */}
      {/* <Tabs.Screen name="surah" options={{ headerTitle: "surah" }} /> */}
    </Tabs>
  );
}
