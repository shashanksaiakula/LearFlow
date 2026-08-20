import { FlatList, Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import CommonCard from '../../../components/common/CommonCard'
import { Review } from '../../../models/Reviews'
import { Colors } from '../../../theme/colors'
import styles from './style'

type ReviewsProps = {
  reviews?: Review[] | null
  courseRating?: string | number
}

const ReviewAvatar = ({ name, image }: { name: string; image?: string }) => {
  const [imageFailed, setImageFailed] = useState(false)
  const initial = name?.charAt(0).toUpperCase() || '?'

  if (!image || imageFailed) {
    return (
      <View style={styles.avatarFallback}>
        <Text style={styles.avatarInitial}>{initial}</Text>
      </View>
    )
  }

  return (
    <Image
      source={{ uri: image }}
      style={styles.avatar}
      onError={() => setImageFailed(true)}
    />
  )
}

const getReviewerName = (review: Review) => {
  const reviewWithFallbackFields = review as Review & {
    name?: string
    user?: { name?: string }
  }

  return review.userName || reviewWithFallbackFields.name || reviewWithFallbackFields.user?.name || 'Anonymous learner'
}

const Reviews = ({ reviews, courseRating }: ReviewsProps) => {
  const reviewList = reviews ?? []
  const averageRating = reviewList.length
    ? reviewList.reduce((total, review) => total + review.rating, 0) / reviewList.length
    : Number(courseRating) || 0

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviewList.filter(review => review.rating === rating).length,
  }))

  const renderStars = (rating: number, size = 16) => (
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map(star => (
        <MaterialDesignIcons
          key={star}
          name={star <= Math.round(rating) ? 'star' : 'star-outline'}
          size={size}
          color={Colors.warning}
        />
      ))}
    </View>
  )

  const renderReview = ({ item }: { item: Review }) => (
    <CommonCard>
      <View style={styles.reviewHeader}>
        <ReviewAvatar name={getReviewerName(item)} image={item.userImage} />
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName} numberOfLines={1}>{getReviewerName(item)}</Text>
          {renderStars(item.rating)}
        </View>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </CommonCard>
  )

  return (
    <FlatList
      data={reviewList}
      keyExtractor={(item, index) => item._id ?? `${item.userId}-${item.createdAt}-${index}`}
      renderItem={renderReview}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <>
          <CommonCard>
            <View style={styles.summary}>
              <View style={styles.averageBlock}>
                <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
                {renderStars(averageRating, 18)}
                <Text style={styles.reviewCount}>{reviewList.length} {reviewList.length === 1 ? 'review' : 'reviews'}</Text>
              </View>
              <View style={styles.distribution}>
                {ratingCounts.map(({ rating, count }) => (
                  <View key={rating} style={styles.distributionRow}>
                    <Text style={styles.ratingLabel}>{rating}</Text>
                    <MaterialDesignIcons name="star" size={13} color={Colors.warning} />
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { width: `${reviewList.length ? (count / reviewList.length) * 100 : 0}%` }]} />
                    </View>
                    <Text style={styles.ratingCount}>{count}</Text>
                  </View>
                ))}
              </View>
            </View>
          </CommonCard>
          <Text style={styles.sectionTitle}>What learners say</Text>
        </>
      }
      ListEmptyComponent={
        <CommonCard>
          <Text style={styles.emptyTitle}>No reviews yet</Text>
          <Text style={styles.emptyText}>Learner feedback will appear here when it is available.</Text>
        </CommonCard>
      }
    />
  )
}

export default Reviews
