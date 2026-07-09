import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Category } from '../models/Category'

interface CategoryCardProps{
    category : Category
}

const CategoryCard = ({category} : CategoryCardProps) => {
  return (
    <View style={styles.card}>
        <Text style ={styles.textStyle}>{category.name}</Text>
    </View>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
     card: {height: 40, backgroundColor: '#fff', borderRadius: 10,elevation:3,marginHorizontal:10, paddingHorizontal:18},
     textStyle:{textAlign : "center", width : "100%",fontWeight: 'bold'}
})