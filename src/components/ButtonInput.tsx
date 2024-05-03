import React, {PropsWithChildren, useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

type ButtonInputProps = PropsWithChildren<{
  label: string;
  onPress: (val: string) => void;
  initValue: string;
}>;

export function ButtonInput({
  label,
  onPress,
  initValue,
}: ButtonInputProps): React.JSX.Element {
  const [value, setValue] = useState<string>(initValue);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonContainer}>
        <Button
          title={label}
          onPress={() => {
            onPress(value);
            console.log('ButtonInput: pressed', value);
          }}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          inputMode="numeric"
          value={value}
          onChange={e => {
            setValue(e.nativeEvent.text);
            console.log('ButtonInput: changed');
          }}
          style={styles.textInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    marginBottom: 2,
  },

  buttonContainer: {
    flex: 5,
    backgroundColor: 'green',
  },

  textInputContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },

  textInput: {
    color: 'black',
    textAlign: 'center',
    padding: 0,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    height: 35,
  },
});
