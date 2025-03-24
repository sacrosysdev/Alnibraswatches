import React from 'react'
import Star from '../../assets/svg/trending/star.svg'
import FillStar from '../../assets/svg/trending/fillstar.svg'
import { FaAngleDown } from "react-icons/fa6";

export const SelectOption = ({ items, showMore }) => (
    <div className="space-y-1">
      {items.map((item) => (
        <div key={item} className="flex items-center">
          <h1>{item}</h1>
        </div>
      ))}
      {showMore && (
        <div className='flex items-center gap-1'>
          <FaAngleDown color='#555555'/>
          <div className="text-[#007185] text-sm cursor-pointer hover:underline">See all two Departments</div>
        </div>
        
      )}
    </div>
  );
  export const StarRating = ({ rating }) => (
  
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
  
  );
  
  export const CheckboxList = ({ items, showMore }) => (
    <div className="space-y-1">
      {items.map((item) => (
        <div key={item} className="flex items-center text-sm">
          <input type="checkbox" id={item.replace(/\s+/g, '')} className="mr-2" />
          <label htmlFor={item.replace(/\s+/g, '')}>{item}</label>
        </div>
      ))}
      {showMore && (
        <div className="text-[#007185] text-sm cursor-pointer hover:underline">See more</div>
      )}
    </div>
  );