/**
 * Circle12 App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  Linking,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Circle12} from './src/lib/Circle12';
import {AudioWebView} from './src/components/AudioWebView';
import {ButtonInput} from './src/components/ButtonInput';
import {Card} from './src/components/Card';
import {colors, styles} from './src/const/styles';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [circle, setCircle] = useState<Circle12>(new Circle12());
  const [toRender, setToRender] = useState<string>(circle.getAll());
  const [title, setTitle] = useState<string>('Full Circle');

  const theme = useColorScheme() || 'light';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    setToRender(circle.getAll());
    setTitle('Full Circle');
  }, [circle]);

  return (
    <SafeAreaView style={[{flex: 1}, colors[theme].app]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Card
        style={{flex: 1}}
        title="Circle-12"
        text={
          'Implementation of the Circle of 12 Tones proposed by Ron Jarzombek.'
        }>
        <Text
          style={{color: '#66f'}}
          onPress={() =>
            Linking.openURL('https://www.ronjarzombek.com/rj12tone.html')
          }>
          {'>>'} https://www.ronjarzombek.com/rj12tone.html
        </Text>
      </Card>

      <View style={[styles.regularContainer, {flex: 3}]}>
        <AudioWebView title={title} toRender={toRender} />
      </View>

      <View style={[styles.regularContainer, {flex: 2}]}>
        <View style={styles.buttonContainer}>
          <Button
            title="Get full circle"
            onPress={() => {
              setToRender(circle.getAll());
              setTitle('Full Circle');
              console.log(circle.getAll());
            }}
          />
        </View>

        <ButtonInput
          label="Get in a row"
          onPress={(val: string) => {
            setToRender(circle.getNInRow(parseInt(val)));
            setTitle(`${val} In Row`);
          }}
          initValue="3"
        />

        <ButtonInput
          label="Get every"
          onPress={(val: string) => {
            setToRender(circle.getEveryN(parseInt(val)));
            setTitle(`Every ${val}`);
          }}
          initValue="3"
        />

        <View style={styles.buttonContainer}>
          <Button
            color="#33f"
            title="Generate new Circle"
            onPress={() => {
              setCircle(new Circle12());
            }}
          />
        </View>
      </View>

      <Card
        style={{flex: 1}}
        title="Credits"
        text={'Code by @leprosy\nOriginal idea by Ron Jarzombek'}
      />
    </SafeAreaView>
  );
}

export default App;
