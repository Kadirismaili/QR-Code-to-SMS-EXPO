import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import * as SMS from "expo-sms";
import * as Contacts from "expo-contacts";

const Sms = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState("05526292521");
  const [message, setMessage] = useState(route.params.data || "");
  const [allContacts, setAllContacts] = useState([]);

  const getContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.PHONE_NUMBERS],
      });

      setAllContacts(data);

      if (data.length > 0) {
        const contact = data[0];
        console.log(contact);
      }
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  const handleSendSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      console.log("available");
    } else {
      console.log("not available");
      // misfortune... there's no SMS available on this device
    }

    try {
      const { result } = await SMS.sendSMSAsync(phoneNumber, message);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item, index }) => {
    console.log(item.phoneNumbers[0]?.digits);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          console.log(item);
        }}
      >
        <Text>
          {item.firstName} {item.lastName}
        </Text>
        {/* <Text>{item.phoneNumbers.number}</Text> */}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TextInput
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send SMS" onPress={handleSendSMS} />
      <FlatList
        data={allContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.number}
      />
    </View>
  );
};

export default Sms;
