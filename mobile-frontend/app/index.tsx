
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

const Signup = () => {
  const [form, setForm] = useState({
    role: 'Electrician',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { role, firstName, lastName, email, password } = form;

    if (!email || !password || !firstName || !lastName) {
      Alert.alert("Validation", "Please fill all fields");
      return;
    }

    try {
      const res = await fetch('http://192.168.91.207:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 201) {
        Alert.alert("Success", "Account created successfully!");
        router.push('/login');
      } else {
        Alert.alert("Signup Failed", data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      Alert.alert("Error", "Network error. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Avatar */}
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/100/user-male-circle.png' }}
          style={styles.avatar}
        />

        <Text style={styles.heading}>Sign Up</Text>

        {/* Role Dropdown */}
        <Picker
          selectedValue={form.role}
          onValueChange={(value) => handleChange('role', value)}
          style={styles.dropdown}
        >
          <Picker.Item label="Electrician" value="Electrician" />
          <Picker.Item label="Engineer" value="Engineer" />
          <Picker.Item label="Sales & Marketing" value="Sales & Marketing" />
        </Picker>

        {/* Name Fields */}
        <View style={styles.row}>
          <TextInput
            placeholder="First name..."
            style={[styles.input, { marginRight: 8 }]}
            onChangeText={(text) => handleChange('firstName', text)}
            value={form.firstName}
          />
          <TextInput
            placeholder="Last name..."
            style={styles.input}
            onChangeText={(text) => handleChange('lastName', text)}
            value={form.lastName}
          />
        </View>

        <TextInput
          placeholder="Email..."
          keyboardType="email-address"
          style={styles.inputFull}
          onChangeText={(text) => handleChange('email', text)}
          autoCapitalize="none"
          value={form.email}
        />

        <TextInput
          placeholder="Password..."
          secureTextEntry
          style={styles.inputFull}
          onChangeText={(text) => handleChange('password', text)}
          value={form.password}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.signinText}>
            Already a member? <Text style={styles.signinLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  inputFull: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signinText: {
    marginTop: 20,
    color: '#555',
  },
  signinLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
