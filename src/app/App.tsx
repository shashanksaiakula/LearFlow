/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Button, StatusBar, StyleSheet, Text, useColorScheme, View, } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import NativeGetVideoListSpec from './specs/NativeGetVideoList';
import { useEffect, useState } from 'react';
import CustomVideoPlayerComponent from './player/CustomVideoPlayerComponent';
import AppNavigation from './navigation/AppNavigation';
import RootNavigator from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// function App() {
//   const isDarkMode = useColorScheme() === 'dark';
//   const [status, setStatus] = useState('GetPermission');
//   const [videoUrl, setVideoUrl] = useState("")
//   const getPermiision = async () => {
//     if (status === 'GetPermission') {
//       try {
//         const result = await NativeGetVideoListSpec.requestVideoPermission();
//         const isUri = result.startsWith('content://');

//         if (isUri) {
//           setStatus('limited');
//           setVideoUrl(result);
//           console.log('Permission result is URI:', result);
//           return;
//         }

//         setStatus(result);
//         console.log('Permission status:', result);

//         if (result === 'limited') {
//           const uri = await NativeGetVideoListSpec.reselectVideos();
//           setVideoUrl(uri);
//           console.log('video url (selected):', uri);
//         }
//       } catch (e) {
//         console.warn('requestVideoPermission failed', e);
//       }
//     } else if (status === 'limited') {
//       try {
//         const uri = await NativeGetVideoListSpec.reselectVideos();
//         setVideoUrl(uri);
//         console.log('video url (selected):', uri);
//       } catch (e) {
//         console.warn('reselectVideos failed', e);
//       }
//     }
//   };

//   const silentCheck = async () => {
//     try {
//       const result = await NativeGetVideoListSpec.checkVideoPermission();
//       if (result === 'granted' || result === 'limited') {
//         setStatus(result);
//       }
//     } catch (e) {
//       console.warn('silentCheck failed', e);
//     }
//   };

//   useEffect(() => {
//     silentCheck();
//   }, []);

//   return (
//     <SafeAreaProvider>
//       <View style={styles.container}>
//         {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//         <Text style={styles.label}>Selected Video URL:</Text>
//         <Text style={styles.url} numberOfLines={2} ellipsizeMode="middle">
//           {videoUrl || 'No video selected'}
//         </Text> */}
//         <Button title={status} onPress={getPermiision} />
//         {videoUrl ? <CustomVideoPlayerComponent videoUri={videoUrl} /> : null}
//       </View>
//     </SafeAreaProvider>
//   );
// }

function App(){
  return( 
    <GestureHandlerRootView style={{ flex: 1 }}>
  <Provider store={store}>
  <RootNavigator /> 
  </Provider>
  </GestureHandlerRootView>
  )
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    margin: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  url: {
    marginHorizontal: 16,
    marginBottom: 16,
    color: '#333',
  },
});

export default App;
