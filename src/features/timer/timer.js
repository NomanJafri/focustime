import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from "expo-keep-awake";

import { fontSizes, spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from "./timing";


export const Timer = (props) => {
  useKeepAwake();
  const [minutes, setMinutes]=useState(0.1)
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  
  const onProgress = (progress) => {
    setProgress(progress)
  }
   
  const vibrate = ()=>{
    if (Platform === 'ios'){
      const interval = setInterval(()=>{Vibration.vibrate()}, 1000);
      setTimeout(() => clearInterval(interval), 10000);
    }else {
      Vibration.vibrate(10000)
    }
  }
  
  const onEnd = ()=>{    
    setMinutes((1/5));
    setProgress(1);
    vibrate();
    setIsStarted(false);
    props.onTimerEnd();

  }

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }
  return (
    <View style={styles.container}>

      <View style={styles.countdown}>
        <Countdown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
      </View>

      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{props.focusSubject}</Text>
      </View>

      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="pause"
            size={100}
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            title="start"
            size={100}
            onPress={() => setIsStarted(true)}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
       <RoundedButton
            title="-"
            size={50}
            onPress={props.clearSubject}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  task: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject:{
    padding: spacing.md,
    marginLeft: spacing.sm
  }
});
