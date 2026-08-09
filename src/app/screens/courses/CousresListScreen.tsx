import { ActivityIndicator, AppState, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
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
  const navigation =useNavigation<CousrseListScreenProps>()

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])


  if (loading) {
    return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
  }

  if (error) {
    console.log("error is " + error)
    return <Text style={styles.errorStyle}>{error}</Text>
  }

const categories = ["All", ...new Set((courses || []).map(c => c?.category).filter(Boolean))];

  const filterCourses = courses?.filter(course => {
    const matchesCategory = selectCatagey === 'All' || course.category === selectCatagey;
    const matchesSearch = course.title?.toLowerCase().includes(search.toLowerCase());
    const filterLevel = selectedLevel === "All" || course.level === selectedLevel
    return matchesCategory && matchesSearch && filterLevel;
  })


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

      <FlatList
        contentContainerStyle={{
          marginVertical: 5,
          // alignItems: "center",
          // flex:1
        }}
        data={filterCourses}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <CourseCard course={item} onClick={() => {
            navigation.navigate("CourseDetails",{
              courseId : item.courseCode
            })
           }} />
        )}
      />
      <FilterBottomSheet visible={filterVisible} onClose={(item) => {
        console.log("dfdfdfdf",!(item! !== ""))
        if (item! === "") {
          setSelectedLevel("All")
        } else{
          setSelectedLevel(item)
        }
        setFilterVisible(false)
      }} levels={levels} />
    </CommomBackGround>
  )
}

export default CousresListScreen
