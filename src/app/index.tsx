import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Onboarding() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const isValid =
    firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "";

  const handleNext = async () => {
    if (!isValid) return;

    await AsyncStorage.setItem(
      "user",
      JSON.stringify({
        firstName,
        lastName,
        email,
      }),
    );

    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.content}
      >
        <View style={styles.logoCircle}>
          <Text style={styles.lemon}>🍋</Text>
        </View>

        <Text style={styles.title}>Little Lemon</Text>
        <Text style={styles.city}>CHICAGO</Text>

        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.subtitle}>Create your profile to get started</Text>

        <View style={styles.form}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={styles.label}>Last Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, !isValid && styles.disabledButton]}
          disabled={!isValid}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F2",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  logoCircle: {
    alignSelf: "center",
    marginBottom: 5,
  },
  lemon: {
    fontSize: 60,
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "800",
    color: "#174C43",
  },
  city: {
    textAlign: "center",
    fontSize: 14,
    letterSpacing: 6,
    color: "#174C43",
    marginTop: 2,
  },
  welcome: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    color: "#174C43",
    marginTop: 35,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 25,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    fontSize: 16,
  },
  button: {
    height: 54,
    borderRadius: 10,
    backgroundColor: "#174C43",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  disabledButton: {
    backgroundColor: "#A9BDB8",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
