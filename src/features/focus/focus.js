import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from "../../utils/sizes";

export const Focus = ({ addSubject }) => {
  const [tempItem, setTempItem] = useState(null);

  function letsSee({nativeEvent}) {
    let val = nativeEvent.text;
    setTempItem(()=>{
      return val
      });      
    }

  return (    
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}> What would you like to focus on? </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Write Something here'            
            style={{ flex: 1, marginRight: spacing.md }}            
            onChange={letsSee} 
            value={tempItem}                      
          />

          <RoundedButton
            onPress={()=>{addSubject(tempItem)}}
            size={50}
            title="+"            
          />
        </View>
      </View>
    </View>    
  );
};

const styles = StyleSheet.create({
  container: { flex: 0.5},
  innerContainer: { flex: 1, padding: 5, justifyContent: 'center' },
  title: { color: 'white', fontWeight: 'bold', fontSize: Platform.os === 'ios' ? fontSizes.lg : fontSizes.md+4 },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
