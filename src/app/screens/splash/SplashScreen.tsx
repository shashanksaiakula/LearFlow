import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { checkAuthenticationRequested } from '../../redux/slices/authSlice';
import Splashlogo1 from '../../assets/svg/splashlogo1.svg'
import Splashlogo2 from '../../assets/svg/spashlogo2.svg'
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import TitleComponent from '../../components/common/TitleComponent';

export default function SplashScreen() {
  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      dispatch(checkAuthenticationRequested());
    }
  }, [progress, dispatch]);


  return (
    <View style={styles.container}>
      <Splashlogo1 width={"40%"} height={"15%"} />
      <TitleComponent/>
      <Text style={styles.subTitle}>Your Jounary to Knowledge</Text>
      <Splashlogo2 width={"100%"} height={"30%"} />
      <Text style={styles.lodingText}>Loding your learning Jounary....</Text>
      <View style={styles.loderContainer}>
        <View style={styles.loderBackground}>
          <View style={[styles.loder, { width: `${progress}%` }]} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  subTitle: {
    ...Typography.body2,
    color: Colors.textSecondary,
    fontWeight: "300"
  },
  lodingText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 20,
    marginVertical: 10,
  },
  loderContainer: {
    width: '100%',
    paddingHorizontal: 60,
  },
  loderBackground: {
    backgroundColor: '#E0E0E0',
    height: 6,
    borderRadius: 10,
    overflow: 'hidden',
  },
  loder: {
    backgroundColor: Colors.primary,
    height: '100%',
    borderRadius: 10,
  },

})
