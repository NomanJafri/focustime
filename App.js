import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Focus } from './src/features/focus/focus';
import { FocusHistory } from './src/features/focus/focushistory';
import { Timer } from './src/features/timer/timer';
import { fontSizes, spacing } from './src/utils/sizes';

const SUBJECT_STATUS = { COMPLETE: 1, CANCELLED: 2 };

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key:String(focusHistory.length+1), subject, status }]);
  };
  console.log(focusHistory);

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    loadFocusHistory();
  },[]);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            setFocusSubject(null);
            addFocusHistorySubjectWithStatus(
              focusSubject,
              SUBJECT_STATUS.COMPLETE
            );
          }}
          clearSubject={() => {
            setFocusSubject(null);
            addFocusHistorySubjectWithStatus(
              focusSubject,
              SUBJECT_STATUS.CANCELLED
            );
          }}
        />
      ) : (
        <View style={{flex:1}} >
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    padding: Platform.OS === 'ios' ? spacing.md : spacing.lg,
  },
});
