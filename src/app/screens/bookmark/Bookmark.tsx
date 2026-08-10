import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import {
  useFocusEffect,
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


const Bookmark = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, bookmarks, error } = useSelector((state: RootState) => state.bookmark)
  const bookemarkdCources = useSelector(selectBookmarkedCourses)

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
            <CourseCard course={item} onClick={() => { }} isBoomarked={true} bookmarkPressed={async () => {
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
