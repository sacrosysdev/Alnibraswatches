import React from 'react'
import Star from '../../../../assets/svg/trending/star.svg'
import FillStar from '../../../../assets/svg/trending/fillstar.svg'

const StarRating = ({rating}) => {
  return (
    <div className="flex items-center">
        <div className="flex text-yellow-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star}>{star <= rating ? <div>
              <img src={FillStar} alt="fillstar" />
            </div> : <span className="text-gray-300">
            <div>
              <img src={Star} alt="star" />
            </div></span>}</span>
          ))}
        </div>
        <span className="ml-2 text-sm">& Up</span>
      </div>
  )
}

export default StarRating