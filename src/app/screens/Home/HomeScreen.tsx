import { ActivityIndicator, Button, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequested } from '../../redux/slices/authSlice';
import { AppDispatch, RootState } from '../../redux/store'
import CourseCard from '../../components/CourseCard';
import HomeHeader from '../../components/HomeHeader';
import ContinueLearningCard from '../../components/ContinueLearningCard';
import { homeRequest } from '../../redux/slices/homeSlicer';
import SectionHeader from '../../components/SectionHeader';
import CategoryCard from '../../components/CategoryCard';
import { StackNavigationProp } from '@react-navigation/stack';
import CommomBackGround from '../../components/common/CommomBackGround';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import TitleComponent from '../../components/common/TitleComponent';
import { Strings } from '../../strings/String';
import { Typography } from '../../theme/typography';
import HomeIcon from '../../assets/svg/home-icon.svg'
import { Input } from '../../components/Input';
import { requestAllCourses } from '../../redux/slices/courseSlicer';
import { selectInProgressCourses } from '../../redux/selectors/courseSelectors';
import { getAllENrolleCousrses } from '../../api/enrollApi';
import { getEnrolledCourse } from '../../redux/thunk/enrollThunk';
import MyCousrseCard from '../../components/MyCousrseCard';
import { selectBookmarkedCourses } from '../../redux/selectors/bookmarkSelector';
import { getBookmark } from '../../redux/thunk/thunkBookmark';

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

const HomeScreen = ({ route, navigation }: props) => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(requestAllCourses())
    dispatch(getBookmark())
    dispatch(homeRequest())
    dispatch(getEnrolledCourse())
  }, [dispatch])
  // const navigation = useNavigation<>()

  const user = useSelector((state: RootState) => state.auth.user)

  const { loading, homeResponse, error } = useSelector((state: RootState) => state.home)
  const inProgressCousres = useSelector(selectInProgressCourses)
  const myBookermark = useSelector(selectBookmarkedCourses)
  const currentLearning = inProgressCousres.find(course => course.courseCode === homeResponse?.continueLearning.courseCode)

console.log("bookmark us ",myBookermark)
  if (loading) {
    return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
  }

  if (error) {
    return <Text style={styles.errorStyle}>{error}</Text>
  }

  // if(courses.length === 0){
  //   return <Text>No Courses avalible</Text>

  return (
    <CommomBackGround>
      <View style={styles.headerContainer}>
        <TitleComponent />
        <MaterialDesignIcons
          name='bell-outline'
          size={26}
          color={Colors.iconsColor}
        />
      </View>
      <ScrollView>
        <View style={styles.WelcomeStyle}>
          <View>
            <Text style={styles.WelcomeTextStyle} >{Strings.welcome}</Text>
            <Text style={styles.nameStyle} >{user?.name} 👋</Text>
            <Text style={styles.WelcomeTextStyle} >{Strings.keep_learning}</Text>
          </View>
          <HomeIcon width="40%" height="100%" />
        </View>
        <SectionHeader title={Strings.contine_learning} isShowViewAll={false} />
        {currentLearning && <ContinueLearningCard continueLearning={{
          progress: currentLearning.progress,
          thumbnail: currentLearning.thumbnail,
          title: currentLearning.title,
          isCompleted: (currentLearning.progress === 100)
        }} />}
        <SectionHeader title={Strings.my_cousrses} onPress={() => { navigation.navigate('BottomTab', { screen: "myLearning" }) }} />
        <FlatList
          horizontal={true}
          data={inProgressCousres.slice(0, 2)}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <MyCousrseCard course={item} onClick={() => { }} />
          }
        />
        <SectionHeader title={Strings.recommended_for_you} isShowViewAll={false} />
        {homeResponse?.recommendedCourses[0] && <CourseCard course={homeResponse?.recommendedCourses[0]} onClick={() => { }} />}
        <SectionHeader title={Strings.my_bookmarked} onPress={() => { navigation.navigate('BottomTab', { screen: "bookmarks" }) }} />
        {myBookermark.length >0 && <CourseCard course={myBookermark[0]} onClick={() => { }} isBoomarked={true}/>}
      </ScrollView>
    </CommomBackGround>
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
    marginHorizontal: Spacing.sm,
    elevation: 3,
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: 'space-between',
    padding: Spacing.md,

  }, WelcomeTextStyle: {
    color: Colors.white,
    ...Typography.body1,
    marginVertical: 6,
  }, nameStyle: {
    color: Colors.white,
    ...Typography.h2,
    marginVertical: 6,
  }
})