import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as SMS from "expo-sms";
import * as Contacts from "expo-contacts";

const Sms = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(route.params.data || "");
  const [allContacts, setAllContacts] = useState([]);
  const [filteredContacts, setFilteredContact] = useState([]);

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
        console.log(contact.phoneNumbers[0].number);
      }
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  const handleSendSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) return;

    try {
      const { result } = await SMS.sendSMSAsync(phoneNumber, message);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const onContactPress = (item) => {
    setPhoneNumber(item.phoneNumbers[0].number);
  };

  // const renderItem = ({ item, index }) => {
  //   if (item?.phoneNumbers[0] === undefined) return;

  //   return (
  //     <TouchableOpacity
  //       style={styles.contact}
  //       activeOpacity={0.7}
  //       onPress={() => onContactPress({ item })}
  //     >
  //       <Text>
  //         {item?.firstName} {item?.lastName}
  //       </Text>
  //       <Text>{item?.phoneNumbers[0]?.number}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  const filtercontacts = (text) => {
    console.log("CONTACTS" + JSON.stringify(allContacts[80].firstName));

    const filtervalue = allContacts.filter((contact) => {
      if (
        contact?.firstName == undefined ||
        contact?.firstName == null ||
        contact?.phoneNumbers == undefined ||
        contact?.phoneNumbers.length < 1
      ) {
        return false;
      }
      return contact?.firstName?.toLowerCase().includes(text?.toLowerCase());
    });

    setFilteredContact(filtervalue);
    return setPhoneNumber(text);
  };

  return (
    <View style={styles.contanier}>
      <TextInput
        style={styles.contactName}
        placeholder="Contact Name"
        value={phoneNumber}
        onChangeText={filtercontacts}
      />
      {filteredContacts.length > 0 && (
        <FlatList
          data={filteredContacts}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.result}
                onPress={() => onContactPress(filteredContacts[0])}
                activeOpacity={0.7}
              >
                <Text> {item?.firstName}</Text>
                <Text> {item?.phoneNumbers[0]?.number}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
      {/* <TextInput
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
      /> */}
      <TouchableOpacity style={styles.button} onPress={handleSendSMS}>
        <Text style={{ color: "white" }}>Send SMS</Text>
      </TouchableOpacity>
      {/* <FlatList
        data={allContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.phoneNumbers[0].number}
      /> */}
    </View>
  );
};

export default Sms;

const styles = StyleSheet.create({
  contanier: { flex: 1 },
  contact: {
    flexDirection: "row",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "blue",
    height: "10%",
    width: "50%",
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
  },
  result: {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 10,
  },
  contactName: {
    fontWeight: "bold",
    fontSize: 25,
    margin: 10,
    backgroundColor: "#CFCFCF",
    padding: 5,
    borderRadius: 4,
  },
  resulText: {
    fontSize: 20,
  },
});
