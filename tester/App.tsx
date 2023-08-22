/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TestCase, TestSuite, Tester} from '@rnoh/testerino';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  GestureType,
  TapGestureHandler,
} from 'react-native-gesture-handler';

function App({}): JSX.Element {
  return (
    <GestureHandlerRootView>
      <ScrollView style={[styles.container]}>
        <Tester>
          <TestSuite name="react-native-gesture-handler">
            <TestCase itShould="toggle color on tap">
              <Example
                createGesture={setBackgroundColor => {
                  return Gesture.Tap().onStart(() => {
                    setBackgroundColor(prev =>
                      prev === 'red' ? 'green' : 'red',
                    );
                  });
                }}
              />
            </TestCase>
            <TestCase itShould="change color to green when panning">
              <Example
                createGesture={setBackgroundColor => {
                  return Gesture.Pan()
                    .onStart(() => {
                      setBackgroundColor('green');
                    })
                    .onEnd(() => {
                      setBackgroundColor('red');
                    });
                }}
              />
            </TestCase>
            <TestCase itShould="toggle color on tap (old API TapGH)">
              <TapExample />
            </TestCase>
          </TestSuite>
        </Tester>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

function Example(props: {
  createGesture: (
    setColor: React.Dispatch<React.SetStateAction<string>>,
  ) => GestureType;
}) {
  const [backgroundColor, setBackgroundColor] = useState('red');

  const gesture = React.useMemo(() => {
    return props.createGesture(setBackgroundColor);
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <View style={{width: 100, height: 32, backgroundColor}} />
    </GestureDetector>
  );
}

function TapExample() {
  const [backgroundColor, setBackgroundColor] = useState('red');

  return (
    <TapGestureHandler
      onActivated={() => {
        setBackgroundColor(prev => (prev === 'red' ? 'green' : 'red'));
      }}>
      <View style={{width: 100, height: 32, backgroundColor}} />
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default App;
