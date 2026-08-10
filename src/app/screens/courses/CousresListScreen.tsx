import { ActivityIndicator, AppState, FlatList, Pressable, SectionList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommomBackGround from '../../components/common/CommomBackGround'
import ComnonHeader from '../../components/common/ComnonHeader'
import { Strings } from '../../strings/String'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import { Colors } from '../../theme/colors'
import { Input } from '../../components/Input'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses } from '../../redux/thunk/coursesThunk'
import { AppDispatch, RootState } from '../../redux/store'
import CourseCard from '../../components/CourseCard'
import styles from './styles'
import FilterBottomSheet from '../../components/FilterBottomSheet'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'
import { useNavigation } from '@react-navigation/native';
import { Course } from '../../models/course'
import { CombinedCourse, selectCompletedCourses, selectInProgressCourses, selectYetToEnrollCourses } from '../../redux/selectors/courseSelectors'
import { getEnrolledCourse } from '../../redux/thunk/enrollThunk'
import ContinueLearningCard from '../../components/ContinueLearningCard'
const CousresListScreen = () => {

  type CousrseListScreenProps = NativeStackNavigationProp<RootStackParamList>;
  const levels = [
    Strings.all,
    Strings.beginner,
    Strings.intermediate,
    Strings.advanced,
  ];

  const [search, setSearch] = useState("")
  const [selectCatagey, setSelectCatagery] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [filterVisible, setFilterVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const { loading, courses, error } = useSelector((state: RootState) => state.courses)
  const navigation = useNavigation<CousrseListScreenProps>()
  const inProgressCourses = useSelector(selectInProgressCourses);
  const yetToEnrollCourses = useSelector(selectYetToEnrollCourses);
  const completedCourses = useSelector(selectCompletedCourses);
  useEffect(() => {
    dispatch(getEnrolledCourse())
    if (!courses) {
      dispatch(fetchCourses())
    }
  }, [dispatch])


  if (loading) {
    return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
  }

  if (error) {
    console.log("error is " + error)
    return <Text style={styles.errorStyle}>{error}</Text>
  }

  const categories = ["All", ...new Set((courses || []).map(c => c?.category).filter(Boolean))];


  const applyFilters = (courseList: CombinedCourse[]) => {
    return courseList.filter(course => {

      const matchesCategory =
        selectCatagey === "All" ||
        course.category === selectCatagey;

      const matchesSearch =
        course.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesLevel =
        selectedLevel === "All" ||
        course.level === selectedLevel;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesLevel
      );
    });
  };

  const sections = [
    {
      type: "inProgress",
      title: Strings.in_progress,
      data: applyFilters(inProgressCourses),
    },
    {
      type: "notEnrolled",
      title: Strings.not_enrolled,
      data: applyFilters(yetToEnrollCourses),
    },
    {
      type: "completed",
      title: Strings.completed,
      data: applyFilters(completedCourses),
    },
  ];


  return (
    <CommomBackGround>
      <ComnonHeader title={Strings.cousrces} leftIcon={
        <MaterialDesignIcons
          name='bell-outline'
          size={22}
          color={Colors.iconsColor}
        />
      } />
      <Input
        value={search}
        onChangeText={setSearch}
        placeHolder={Strings.search_course}
        leftIcon={
          <MaterialDesignIcons
            name='magnify'
            size={22}
            color={Colors.iconsColor}
          />
        }
        rightIcon={
          search ? (
            <MaterialDesignIcons name='close' size={22} color={Colors.iconsColor} />
          ) : (
            <MaterialDesignIcons name='filter-variant' size={22} color={Colors.iconsColor} />
          )
        }
        containerStyle={{ marginHorizontal: 16, marginTop: 16 }}
        rightIconPress={() => {
          if (search) {
            setSearch("")
          } else {
            setFilterVisible(true);
          }
        }}
      />

      <View style={{ height: 40, marginVertical: 5 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item, index) => `${item}-${index}`}
          contentContainerStyle={{ paddingHorizontal: 22, alignItems: 'center' }}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.categoryContainer, (item === selectCatagey) && { backgroundColor: Colors.primary }]}
              onPress={() => { setSelectCatagery(item) }}
            >
              <Text style={[styles.categoryText, (item === selectCatagey) && { color: Colors.white }]}>
                {item}
              </Text>
            </Pressable>
          )}
        />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.courseCode}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>
            {section.title}
          </Text>
        )}
        renderItem={({ item, section, }) => {

          if (section.title === Strings.in_progress) {
            return (
              <ContinueLearningCard
                continueLearning={{
                  title: item.title,
                  progress: item.progress,
                  thumbnail: item.thumbnail,
                  isCompleted: false,
                }}
                onPress={() => {
                  navigation.navigate("CourseDetails", {
                    courseId: item.courseCode,
                    progress: item.progress,
                    isEnrolled : true
                  });
                }}
              />
            );
          }

          if (section.title === Strings.completed) {
            return (
              <ContinueLearningCard
                continueLearning={{
                  title: item.title,
                  progress: item.progress,
                  thumbnail: item.thumbnail,
                  isCompleted: true,
                }}
                onPress={() => {
                  navigation.navigate("CourseDetails", {
                    courseId: item.courseCode,
                    progress: item.progress,
                    isEnrolled : true
                  });
                }}
              />
            );
          }

          return (
            <CourseCard
              course={item}
              onClick={() => {
                navigation.navigate("CourseDetails", {
                  courseId: item.courseCode,
                  isEnrolled: false,
                  progress : 0
                });
              }}
            />
          );
        }}
      />

      <FilterBottomSheet visible={filterVisible} onClose={(item) => {
        console.log("dfdfdfdf", !(item! !== ""))
        if (item! === "") {
          setSelectedLevel("All")
        } else {
          setSelectedLevel(item)
        }
        setFilterVisible(false)
      }} levels={levels} />
    </CommomBackGround>
  )
}

export default CousresListScreen
