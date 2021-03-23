import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = (props) => {
  const [millis, setMillis] = useState(null);
  const minutesLeft = Math.floor(millis / 1000 / 60);
  const secondsLeft = (millis / 1000) % 60;
  const interval = useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);              
        return time;
      }
      const timeLeft = time - 1000;      
      return timeLeft;
    });   
  };

  useEffect(() => {
    props.onProgress(millis / minutesToMillis(props.minutes));    
    if (millis === 0){
      props.onEnd();      
    }
  }, [millis, countDown]);

  useEffect(() => {
    if (props.isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [props.isPaused]);

  useEffect(() => {
    setMillis(minutesToMillis(props.minutes));
  }, [props.minutes]);


  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minutesLeft)}:{formatTime(secondsLeft)}{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: spacing.lg,
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
