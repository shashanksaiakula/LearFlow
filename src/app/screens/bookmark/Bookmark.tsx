import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import {
  NavigationContainerProps,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import CommomBackGround from '../../components/common/CommomBackGround'
import ComnonHeader from '../../components/common/ComnonHeader'
import { Strings } from '../../strings/String'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { deleteBookmark, getBookmark } from '../../redux/thunk/thunkBookmark'
import { selectBookmarkedCourses } from '../../redux/selectors/bookmarkSelector'
import CourseCard from '../../components/CourseCard'
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



const Bookmark = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, bookmarks, error } = useSelector((state: RootState) => state.bookmark)
  const bookemarkdCources = useSelector(selectBookmarkedCourses)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useFocusEffect(
    useCallback(() => {
      dispatch(getBookmark());
    }, [dispatch])
  );

  if (loading) {
    return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
  }

  if (error) {
    return <Text style={styles.errorStyle}>{error}</Text>
  }
  return (
    <View style={styles.mainContainer}>
      <CommomBackGround>
        <ComnonHeader title={Strings.bookmark} />
        <FlatList
          data={bookemarkdCources}
          keyExtractor={(item, index) => `${item.id}${index}`}
          renderItem={({ item }) => (
            <CourseCard course={item} onClick={() => {
              navigation.navigate("CourseDetails", {
                courseId: item.courseCode,
                isEnrolled: false,
                currentLessonCode: "",
                currentLessonPosition: 0,
                progress: 0
              })
            }} isBoomarked={true} bookmarkPressed={async () => {
              await dispatch(deleteBookmark({ id: item.bookmarkId })).unwrap()
              dispatch(getBookmark())
            }} />
          )}
        />
      </CommomBackGround>
    </View>
  )
}

export default Bookmark
