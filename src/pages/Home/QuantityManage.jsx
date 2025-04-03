import React, { useState } from 'react'

const QuantityManage = () => {
    const [quantity, setQuantity] = useState(1)
    const quantityIncrease=()=>{
        setQuantity((prev)=>(prev + 1))
    }
    const quantityDecrease=()=>{
        setQuantity((prev)=>(prev - 1))
    }
  return (
    <div className='flex  justify-between items-center gap-3 w-16 py-1 mx-auto px-2 border  border-white rounded-lg'> 
        <div className='cursor-pointer' onClick={quantityDecrease}>-</div>
        <div>{quantity}</div>
        <div className='cursor-pointer' onClick={quantityIncrease}>+</div>
    </div>
  )
}

export default QuantityManage