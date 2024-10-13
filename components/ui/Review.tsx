"use client"

import React, { useState } from 'react'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import { IParking } from '@/lib/database/models/parking.model'
import { addReview } from '@/lib/actions/parking.actions'
import ReviewBox from './ReviewBox'

const Review = ({ parking }: { parking: IParking }) => {
  const { user } = useUser()
  const userId = user?.publicMetadata.userId as string
  const [reviews, setReviews] = useState(parking.reviews || [])
  const [newReview, setNewReview] = useState('')

  const handleAddReview = async () => {
    if (!newReview.trim() || !userId) return

    try {
      const reviewParams = {
        userId,
        parkingId: parking._id,
        review: newReview
      }
      
      const updatedParking = await addReview(reviewParams)

      if (updatedParking) {
        setReviews(updatedParking.reviews)
        setNewReview('')
      } else {
        console.error('Failed to add review')
      }
    } catch (error) {
      console.error('Error adding review:', error)
    }
  }

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 border-b border-gray-200 pb-2">Reviews</h2>
      
      <SignedIn>
        <div className="mb-8">
          <textarea
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Share your experience..."
            rows={4}
          />
          <button 
            className="mt-3 px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={handleAddReview}
          >
            Submit Review
          </button>
        </div>
      </SignedIn>

      <SignedOut>
        <p className="mb-6 text-gray-600 italic">Please sign in to leave a review.</p>
      </SignedOut>

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewBox 
              key={review._id || index} 
              userName={`${review.firstName} ${review.lastName}`}
              review={review.review}
            />
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
        )}
      </div>
    </div>
  )
}

export default Review