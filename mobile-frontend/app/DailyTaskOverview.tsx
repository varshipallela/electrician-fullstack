import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const DailyTaskOverview = () => {
  const data = {
    customerName: 'Chalavadi Sai Babu',
    contactNumber: '9206655449',
    mapUrl: 'https://maps.google.com',
    tasks: [
      {
        name: 'Installation of IR Blaster',
        quantity: 2,
        locations: ['MBR', 'CBR'],
        status: 'Completed',
      },
      {
        name: 'Installation of Touch Switches',
        quantity: 5,
        modules: ['4M', '6M', '8M', '8M', '12M'],
        locations: ['MBR', 'CBR', 'Living Room'],
        status: 'Pending',
      },
      {
        name: 'Installation of Video Door Bell',
        quantity: 1,
        locations: ['Main Door Entrance'],
        status: 'Pending',
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.customer}>Customer: {data.customerName}</Text>
        <Text style={styles.contact}>Contact: {data.contactNumber}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(data.mapUrl)}>
          <Text style={styles.mapLink}>📍 Google Map</Text>
        </TouchableOpacity>

        {data.tasks.map((task, index) => (
          <View key={index} style={styles.taskBox}>
            <Text style={styles.taskTitle}>{task.name}</Text>
            <Text>Quantity: {task.quantity}</Text>
            {task.modules && <Text>Modules: {task.modules.join(', ')}</Text>}
            <Text>Locations: {task.locations.join(', ')}</Text>
            <Text>
              Status:{' '}
              <Text style={{ color: task.status === 'Completed' ? 'green' : 'orange' }}>
                {task.status}
              </Text>
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default DailyTaskOverview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F3F3',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    marginBottom: 20,
  },
  customer: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contact: {
    fontSize: 14,
    color: '#333',
  },
  mapLink: {
    color: '#007BFF',
    marginVertical: 8,
  },
  taskBox: {
    marginTop: 12,
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
});
