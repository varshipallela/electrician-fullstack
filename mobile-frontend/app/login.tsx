
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   Alert
// } from 'react-native';
// import { router } from 'expo-router';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // const handleLogin = async () => {
//   //   if (!email || !password) {
//   //     Alert.alert('Validation', 'Please enter both email and password');
//   //     return;
//   //   }

//   //   try {
//   //     const response = await fetch('http://192.168.91.207:5000/api/login', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ email, password }),
//   //     });

//   //     const data = await response.json();

//   //     if (response.status === 200 && data.user.name) {
//   //       Alert.alert('Login Successful', `Welcome ${data.user.name}`);
//   //       // Navigate to dashboard or home
//   //       // router.push('/dashboard');
//   //     } else {
//   //       Alert.alert('Login Failed', data.message || 'Invalid credentials');
//   //     }
//   //   } catch (error) {
//   //     console.error('Login error:', error);
//   //     Alert.alert('Error', 'Something went wrong. Please try again later.');
//   //   }
//   //};
//   const handleLogin = async () => {
//   if (!email || !password) {
//     Alert.alert('Validation', 'Please enter email and password');
//     return;
//   }

//   try {
//     const res = await fetch('http://192.168.91.207:5000/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
    

//     if (res.status === 200) {
       
//       Alert.alert('Success', `Welcome ${data.user.name}`);
//      console.log(data);
     

     
     
//     } else {
//       Alert.alert('Login Failed', data.message || 'Invalid credentials');
//     }
//   } catch (err) {
//     console.error('Login error:', err);
//     Alert.alert('Network Error', 'Please try again later.');
//   }
// };


//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.heading}>Login</Text>

//         <TextInput
//           placeholder="Email..."
//           style={styles.input}
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           placeholder="Password..."
//           style={styles.input}
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//           secureTextEntry
//         />

//         <Button title="Sign In" onPress={handleLogin} />

//         <TouchableOpacity onPress={() => Alert.alert("Coming Soon", "Forgot password flow is under development.")}>
//           <Text style={styles.footerText}>Forgot your password?</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     marginBottom: 12,
//   },
//   footerText: {
//     marginTop: 16,
//     color: '#007AFF',
//     textAlign: 'center',
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { router } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Please enter email and password');
      return;
    }

    try {
      const res = await fetch('http://192.168.91.207:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (res.status === 200 && data.user) {
        const welcomeMessage = data.user.name
          ? `Welcome ${data.user.name}`
          : `Welcome ${data.user.email}`;

        if (Platform.OS === 'web') {
          alert(welcomeMessage); // Fallback for web
        } else {
          Alert.alert('Login Successful', welcomeMessage);
        }

        // Optional: Navigate to home/dashboard
        // router.push('/dashboard');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Network Error', 'Could not connect to the server. Check your IP and try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Login</Text>

        <TextInput
          placeholder="Email..."
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password..."
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <Button title="Sign In" onPress={handleLogin} />

        <TouchableOpacity
          onPress={() =>
            Alert.alert('Coming Soon', 'Forgot password flow is under development.')
          }
        >
          <Text style={styles.footerText}>Forgot your password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  footerText: {
    marginTop: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
});
