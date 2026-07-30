import { ActivityIndicator, Button, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequested } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store'
import CourseCard from '../../components/CourseCard';
import HomeHeader from '../../components/HomeHeader';
import ContinueLearningCard from '../../components/ContinueLearningCard';
import { homeRequest } from '../../redux/slices/homeSlicer';
import SectionHeader from '../../components/SectionHeader';
import CategoryCard from '../../components/CategoryCard';
import { StackNavigationProp } from '@react-navigation/stack';


//router props
type HomeScreenRoutProp = RouteProp<
  RootStackParamList,
  "Home"
>

// use for navigation
type HomeScreenNavigationProp =
  StackNavigationProp<
    RootStackParamList,
    'Home'
  >;

// all combine of router and navigation
type props = {
  route: HomeScreenRoutProp,
  navigation: HomeScreenNavigationProp
}

const HomeScreen = ({route, navigation}: props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(requestAllCourses())
    dispatch(homeRequest())
  }, [])
  // const navigation = useNavigation<>()

  const user = useSelector((state: RootState) => state.auth.user)

  // const { loading, courses, error } = useSelector((state: RootState) => state.courses)

  const { loading, homeResponse, error } = useSelector((state: RootState) => state.home)

  const onLogout = () => {
    dispatch(logoutRequested())
  }

  if (loading) {
    return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
  }

  if (error) {
    return <Text style={styles.errorStyle}>{error}</Text>
  }

  // if(courses.length === 0){
  //   return <Text>No Courses avalible</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.WelcomeStyle} >Welcome {user.name}</Text>
      <SectionHeader title='Continue Learning' />
      {homeResponse && <ContinueLearningCard continueLearning={homeResponse?.continueLearning} />}
      <SectionHeader title='Categories'/>
    <FlatList
      horizontal = {true}
      data={homeResponse?.categories}
       keyExtractor={(item) => item.id.toString()}
       renderItem={({ item }) => (
          <CategoryCard category={item} />
        )}
      />
      <FlatList
        ListHeaderComponent={HomeHeader}
        data={homeResponse?.recommendedCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CourseCard course={item} onClick={() =>navigation.navigate("CourseDetails", {
            courseId : item.id
          })}/>
        )}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  errorStyle: {
    fontSize: 20,
    color: "red"
  },
  container: {
    flex: 1,
  },
  indicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  WelcomeStyle: {
    width: "100%",
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 22,
    elevation: 3,
    backgroundColor: "#fff",

  }
})