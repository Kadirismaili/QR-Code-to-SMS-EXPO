import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

export default function Home (){
    const navigation =useNavigation();

    return(
        <View style={StyleSheet.container}>
            <Button title='Scan' onPress={()=> navigation.navigate('Scanner')} />
        </View>
    );

}
    
/*
function AppButton({ onPress, title }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}


  const styles = StyleSheet.create({
     
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });
 */
 
  const styles = StyleSheet.create({
    container : {
     //   flex:1,
        elevation: 8,
        backroundcolor:'#fff',
        alignItems:'center',
        justifyContent:'center'
        
    }
})
