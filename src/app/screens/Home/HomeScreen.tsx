import { ActivityIndicator, Button, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import CommomBackGround from '../../components/common/CommomBackGround';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import TitleComponent from '../../components/common/TitleComponent';
import { Strings } from '../../strings/String';
import { Typography } from '../../theme/typography';
import HomeIcon from '../../assets/svg/home-icon.svg'
import { Input } from '../../components/Input';

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
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  useEffect(() => {
    // dispatch(requestAllCourses())
    dispatch(homeRequest())
  }, [dispatch])
  // const navigation = useNavigation<>()

  const user = useSelector((state: RootState) => state.auth.user)

  // const { loading, courses, error } = useSelector((state: RootState) => state.courses)

  const { loading, homeResponse, error } = useSelector((state: RootState) => state.home)


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
        <Input
          value={search}
          onChangeText={setSearch}
          placeHolder={Strings.search_home}
          leftIcon={
            <MaterialDesignIcons
              name='magnify'
              size={22}
              color={Colors.iconsColor}
            />
          }
          rightIcon={
            <MaterialDesignIcons
              name='filter-variant'
              size={22}
              color={Colors.iconsColor}
            />
          }
          containerStyle={{ marginHorizontal: 16, marginTop: 16 }}
        />
        <SectionHeader title={Strings.contine_learning} />
        {homeResponse && <ContinueLearningCard continueLearning={homeResponse?.continueLearning} />}
        {/* <SectionHeader title={Strings.categories} />
        <FlatList
          horizontal={true}
          data={homeResponse?.categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CategoryCard category={item} />
          )}
        /> */}
        <SectionHeader title={Strings.recommended_for_you} />
        {/* <FlatList
        horizontal={true}
          // ListHeaderComponent={HomeHeader}
          data={homeResponse?.recommendedCourses[0]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseCard course={item} onClick={() => navigation.navigate("CourseDetails", {
              courseId: item.id
            })} />
          )}
        /> */}
        {homeResponse && <CourseCard course={homeResponse?.recommendedCourses[4]} onClick={() => {}
      //   navigation.navigate("CourseDetails", {
      //     courseId: homeResponse?.recommendedCourses[4].id
      //   }
      // )
      } 
        />}
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