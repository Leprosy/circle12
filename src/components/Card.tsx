import React, {PropsWithChildren} from 'react';
import {Text, View, ViewStyle, useColorScheme} from 'react-native';
import {colors, styles} from '../const/styles';

type CardProps = PropsWithChildren<{
  style?: ViewStyle;
  title: string;
  text: string;
}>;

export function Card({
  title,
  text,
  style,
  children,
}: CardProps): React.JSX.Element {
  const theme = useColorScheme() || 'light';

  return (
    <View style={[styles.sectionContainer, colors[theme].container, style]}>
      <Text style={[styles.title, colors[theme].text]}>{title}</Text>
      <Text style={colors[theme].text}>{text}</Text>
      {children}
    </View>
  );
}
