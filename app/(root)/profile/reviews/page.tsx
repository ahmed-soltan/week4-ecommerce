import ReviewsList from '@/features/profile/components/reviews/reviews-list'
import React from 'react'

const ReviewsPage = () => {
  return (
    <div className='flex items-start flex-col gap-5'>
        <ReviewsList/>
    </div>
  )
}

export default ReviewsPage