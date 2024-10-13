import React from 'react'

const ReviewBox = ({ userName, review }: { userName: string, review: string }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{userName}</h3>
      <p className="text-gray-600">{review}</p>
    </div>
  )
}

export default ReviewBox