import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Profile() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const savedUser = await AsyncStorage.getItem("user");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
    }
  };

  const saveChanges = async () => {
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({
        firstName,
        lastName,
        email,
      }),
    );

    Alert.alert("Saved", "Your profile has been updated.");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.avatar}>👤</Text>

        <Text style={styles.title}>Personal Information</Text>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F2",
  },
  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  back: {
    fontSize: 32,
    color: "#174C43",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#174C43",
  },
  content: {
    padding: 22,
  },
  avatar: {
    fontSize: 70,
    textAlign: "center",
    marginVertical: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#174C43",
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 14,
    fontSize: 16,
  },
  saveButton: {
    height: 52,
    backgroundColor: "#174C43",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  saveText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "800",
  },
  logoutButton: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D33",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  logoutText: {
    color: "#D33",
    fontSize: 17,
    fontWeight: "800",
  },
});
