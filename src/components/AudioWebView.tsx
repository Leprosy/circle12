import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import WebViewHtml from '../lib/audio-webview/audio-webview';

type AudioWebViewProps = PropsWithChildren<{
  title: string;
  toRender: string;
}>;

export function AudioWebView({
  title,
  toRender,
}: AudioWebViewProps): React.JSX.Element {
  const [ready, setReady] = useState<Boolean>(false);
  const webViewRef = useRef<WebView>(null);
  const run = (text1: string, text2: string) => {
    return `
console.log('Rendering:  ${text2}');
ABCJS.renderAbc("display", 'T:${text1}\\n${text2}', {scale: 2.5, staffwidth: 900, clickListener: click});
groups = '${text2}'.split('|');
document.getElementById('controls').innerHTML = '';
groups.forEach((item, i) => {
  el = document.createElement('h1');
  el.innerHTML = "Play bar " + (i + 1);
  el.onclick = () => playBar(item);
  document.getElementById('controls').append(el);
});
true;
`;
  };

  useEffect(() => {
    if (ready) {
      console.log('AudioWebView: Running command', run(title, toRender));
      webViewRef.current?.injectJavaScript(run(title, toRender));
    }
  }, [toRender, title, ready]);

  return (
    <WebView
      source={{html: WebViewHtml}}
      style={{flex: 1, height: 200}}
      ref={webViewRef}
      onMessage={msg => {
        if (msg.nativeEvent.data === 'start') {
          console.log('AudioWebView: webview window ready', msg.nativeEvent);
          setReady(true);
        }
      }}
    />
  );
}
