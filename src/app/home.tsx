import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const menu = [
  {
    name: "Greek Salad",
    category: "Starters",
    price: "$12",
    description: "Fresh vegetables, feta cheese and olives.",
  },
  {
    name: "Bruschetta",
    category: "Starters",
    price: "$9",
    description: "Toasted bread with tomatoes and herbs.",
  },
  {
    name: "Pasta",
    category: "Mains",
    price: "$14",
    description: "Homemade pasta with Mediterranean flavours.",
  },
  {
    name: "Grilled Fish",
    category: "Mains",
    price: "$18",
    description: "Fresh grilled fish with seasonal vegetables.",
  },
  {
    name: "Baklava",
    category: "Desserts",
    price: "$8",
    description: "Sweet pastry with nuts and honey.",
  },
  {
    name: "Lemonade",
    category: "Drinks",
    price: "$5",
    description: "Freshly squeezed house lemonade.",
  },
];

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.logo}>🍋 Little Lemon</Text>

              <TouchableOpacity onPress={() => router.push("/profile")}>
                <Text style={styles.profileIcon}>👤</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.hero}>
              <Text style={styles.heroTitle}>Mediterranean food</Text>
              <Text style={styles.heroTitle}>made with love.</Text>

              <Text style={styles.heroText}>
                Fresh ingredients and authentic flavours. A taste of the
                Mediterranean in Chicago.
              </Text>

              <TextInput
                style={styles.search}
                placeholder="🔍  Search for dishes..."
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <Text style={styles.sectionTitle}>Menu Categories</Text>

            <View style={styles.categories}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.category,
                    selectedCategory === category && styles.selectedCategory,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category &&
                        styles.selectedCategoryText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Popular Dishes</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No dishes found.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F2",
  },
  list: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: "#174C43",
    padding: 20,
    paddingTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    color: "#FFF",
    fontSize: 23,
    fontWeight: "800",
  },
  profileIcon: {
    fontSize: 27,
  },
  hero: {
    backgroundColor: "#174C43",
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  heroTitle: {
    color: "#F4CE14",
    fontSize: 28,
    fontWeight: "800",
  },
  heroText: {
    color: "#FFF",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 15,
  },
  search: {
    backgroundColor: "#FFF",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#174C43",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    gap: 8,
  },
  category: {
    backgroundColor: "#E9E9E0",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  selectedCategory: {
    backgroundColor: "#F4CE14",
  },
  categoryText: {
    color: "#174C43",
    fontWeight: "700",
  },
  selectedCategoryText: {
    color: "#174C43",
  },
  menuItem: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#174C43",
  },
  description: {
    color: "#666",
    marginTop: 5,
    lineHeight: 19,
  },
  price: {
    color: "#174C43",
    fontSize: 17,
    fontWeight: "800",
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "#777",
  },
});
