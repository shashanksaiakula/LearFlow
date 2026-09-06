import { ActivityIndicator, Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../../navigation/types'
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useCousre from '../../hooks/useCousre';
import CommomBackGround from '../../components/common/CommomBackGround';
import ComnonHeader from '../../components/common/ComnonHeader';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../../theme/colors';
import { BASE_URL } from '../../api/apiClinet';
import styles from './styes';
import { Strings } from '../../strings/String';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import Overview from './overview';
import Instructor from './instructor';
import Curiculam from './curiculam';
import CommonCard from '../../components/common/CommonCard';
import { getImageUrl } from '../../utils/imageUtils';


type CoueseDetailScreenProps = RouteProp<RootStackParamList, "CourseDetails">

type CoursesDetailsScreenNavigationProps = StackNavigationProp<RootStackParamList, "CourseDetails">

type Props = {
  route: CoueseDetailScreenProps
  navigation: CoursesDetailsScreenNavigationProps
}

const CourseDetialsScreen = ({ route, navigation }: Props) => {
  const { courseId } = route.params
  const { loading, error, course, lessons, instructor, reviews } = useCousre(courseId)
  const [selectedTab, setSelectedTab] = useState(Strings.overview)

  if (loading) {
    return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
  }

  if (error) {
    return <Text style={styles.errorStyle}>{error}</Text>
  }

  const sortedLessons = Array.isArray(lessons?.data)
    ? [...lessons.data].sort((a, b) => a.lessonNumber - b.lessonNumber)
    : [];




  // console.log("lessons is ", lessons?.data)


  const renderTabContent = () => {
    switch (selectedTab) {
      case Strings.overview:
        return <Overview description={course?.overview.description} whatYouWillLearn={course?.overview.whatYouWillLearn} />;
      case Strings.curriculum:
        return <Curiculam lessons={sortedLessons} />;
      case Strings.instructor:
        return <Instructor instructor={instructor} />;
      case Strings.reviews:
        return <Reviews reviews={reviews} courseRating={course?.rating} />;
      default:
        return <Overview description={course?.overview.description.value} whatYouWillLearn={course?.overview.whatYouWillLearn} />;
    }
  };


  console.log("coustre ios ", route.params.currentLessonCode)
  return (
    <CommomBackGround>
      <View style={styles.container}>
        <ComnonHeader title={course?.title}
          rightIcon={
            <MaterialDesignIcons
              name='arrow-left'
              size={28}
              color={Colors.iconsColor}
            />
          }
          onPressRight={() => { navigation.pop() }}
          // leftIcon={
          //   !route.params?.isEnrolled ? (
          //     <CommonIconWithLoder
          //       icon='bookmark-outline'
          //       size={28}
          //       color={Colors.iconsColor}
          //       loding={false}
          //       onPress={ async () => {
          //         if (route.params.isBookmarked) {
          //           await dispatch(deleteBookmark({ id: route.params.bookmarkId })).unwrap()
          //         } else {
          //           await dispatch(addBookmark({ courseCode: route.params.courseCode })).unwrap()
          //         }
          //         dispatch(getBookmark())
          //       }}
          //     />
          //   ) : undefined
          // }

        />

        <CommonCard>
          {/* <Text style={styles.titleTextStle}>{course?.title}</Text> */}
          <View style={styles.topContainer}>
            <Image source={{ uri: `${BASE_URL}${course?.thumbnail}` }}
              style={styles.thumbnail}
            />
            <View style={styles.topViewContentStyle}>
              <Text style={styles.discTextStle}>{course?.description}</Text>
              <View style={styles.topContainer}>
                <Text style={styles.otherText}>{course?.level}</Text>
                <Text style={styles.otherText}>{course?.totalLessons} Lessons</Text>
              </View>
            </View>
          </View>
          <View style={styles.topContainer}>
            <Text style={styles.otherText}>⭐ {course?.rating} (2.4k) </Text>
            <MaterialDesignIcons
              name='account-multiple-outline'
              size={18}
            />
            <Text style={styles.otherText}>{course?.totalStudents} </Text>
            <Text style={[styles.discTextStle, { padding: 0 }]}>{Strings.enrolled} </Text>
          </View>
        </CommonCard>
        <View style={styles.tabContainer}>
          <Text style={[styles.tabText, selectedTab === Strings.overview && styles.tabUnderLine]} onPress={() => setSelectedTab(Strings.overview)}>{Strings.overview} </Text>
          <Text style={[styles.tabText, selectedTab === Strings.curriculum && styles.tabUnderLine]} onPress={() => setSelectedTab(Strings.curriculum)}>{Strings.curriculum} </Text>
          <Text style={[styles.tabText, selectedTab === Strings.instructor && styles.tabUnderLine]} onPress={() => setSelectedTab(Strings.instructor)}>{Strings.instructor} </Text>
          <Text style={[styles.tabText, selectedTab === Strings.reviews && styles.tabUnderLine]} onPress={() => setSelectedTab(Strings.reviews)}>{Strings.reviews} </Text>
        </View>
        <View style={{ flex: 1 }}>
          {renderTabContent()}
        </View>
      </View>


      <View style={styles.bottomView}>
        {route.params.isEnrolled ?
          <View style={{ flex: 1 }}>
            {route.params.progress === 100 ? <PrimaryButton title={Strings.completed} onPress={() => {

            }}
              variant='success'
            /> :
              <PrimaryButton title={`${Strings.in_progress} - ${route.params.progress}%`} onPress={() => {
                navigation.navigate('LessonPlayer', {
                  courseId: courseId,
                  lessonId: route.params.currentLessonCode,
                  currentLessonPosition: route.params.currentLessonPosition
                })
              }} />
            }
          </View>
          : <>
            <View style={{ flex: 1 }}>
              <Text style={styles.tabText}>{Strings.total_price}</Text>
              {course?.discountPrice ?
                <View style={styles.topContainer}>
                  <Text style={[styles.tabText, { textDecorationLine: 'line-through' }]}>₹{course?.price}</Text>
                  <Text style={[styles.tabText]}>₹{course?.discountPrice}</Text>
                </View> :
                <Text style={[styles.tabText,]}>₹{course?.price}</Text>}
            </View>
            <View style={{ flex: 1 }}>
              <PrimaryButton onPress={() => {
                navigation.navigate("Checkout", {
                  courseCode: course?.courseCode ?? "",
                  amount: course?.discountPrice ?? course?.price ?? 0,
                  lessonId: sortedLessons[0]?.lessonCode ?? ""
                })
              }} title={Strings.enroll_now} />
            </View>
          </>
        }
      </View>
    </CommomBackGround>
  )
}

export default CourseDetialsScreen
