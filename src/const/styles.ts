import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  sectionContainer: {
    margin: 10,
    padding: 20,
  },
  regularContainer: {
    margin: 10,
  },
  buttonContainer: {
    marginBottom: 2,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});

export const colors = {
  dark: StyleSheet.create({
    app: {
      backgroundColor: '#000',
    },
    container: {
      backgroundColor: '#222',
    },
    text: {
      color: '#fff',
    },
  }),

  light: StyleSheet.create({
    app: {
      backgroundColor: '#ddd',
    },
    container: {
      backgroundColor: '#fff',
    },
    text: {
      color: '#000',
    },
  }),
};
