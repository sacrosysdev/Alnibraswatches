import React, { useState } from 'react';
import Star from '../../../assets/svg/product/star.svg';
import WStar from '../../../assets/svg/product/whitestar.svg';
import { FaAngleRight } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Rating } from 'react-simple-star-rating';
import { useAddReview, useGetReviews } from '../../../api/user/hooks';
import { useQueryClient } from '@tanstack/react-query';

const Ratings = ({ product }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const { data: reviews = [], isLoading: reviewsLoading } = useGetReviews(product?.productId);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const queryClient = useQueryClient();
    const { mutate: submitReview, isLoading } = useAddReview();
    const handleRating = (rate) => {    setRating(rate);    };
    
    const handleSubmitReview = () => {
        const payload = {
            productId: product?.productId,
            reviewText,
            rating
        };
        submitReview(payload, {
            onSuccess: () => {
                queryClient.invalidateQueries(["getReview"]);
                setShowPopup(false);
                setRating(0);
                setReviewText("");
            },
            onError: (err) => {
                console.error("Review submission failed", err);
            }
        });
    };

    return (
        <div className="relative">
            <div className='flex justify-between items-center py-3'>
                <div>
                    <h1 className='font-medium text-xl'>Ratings & Reviews</h1>
                    <p
                        className='text-md mt-3 text-blue-600 cursor-pointer'
                        onClick={() => setShowPopup(true)}
                    >
                        Add a Review
                    </p>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-2 items-center'>
                        <h1 className='font-bold text-3xl font-bodoni'> {reviews?.reviewCon?.[0]?.AverageRating ?? '0.0'}</h1>
                        <div>
                            <img src={Star} alt="star" />
                        </div>
                    </div>
                </div>
            </div>
            <hr className='text-[#E5E5E5]' />
            <div>
                {(showAllReviews ? reviews.reviewDetail : reviews.reviewDetail?.slice(0, 3))?.map((review, index) => (
                    <div key={index}>
                        <div className='flex gap-3 items-start py-5'>
                            <div className='flex gap-1 items-center p-1 text-white bg-[#005C53] w-fit rounded-md'>
                                <h1>{review.RatingStar}</h1>
                                <img src={WStar} alt="logo" />
                            </div>
                            <div>
                                <h1>{review.ReviewText}</h1>
                                <h1>{review.UserName}, {review.ReviewDate}</h1>
                            </div>
                        </div>
                        <hr className='text-[#E5E5E5]' />
                    </div>
                ))}
            </div>

            {reviews.reviewDetail?.length > 3 && (
                <div
                    className='py-5 font-gilroy flex justify-between items-center cursor-pointer'
                    onClick={() => setShowAllReviews(!showAllReviews)}
                >
                    <h1 className='text-base font-medium'>
                        {showAllReviews ? 'Show less' : `See all ${reviews.reviewDetail.length} Reviews`}
                    </h1>
                    <FaAngleRight className={showAllReviews ? 'rotate-90 transition-transform' : 'transition-transform'} />
                </div>
            )}

            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
                        >
                            <IoMdClose />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Write a Review</h2>

                        {/* Rating */}
                        <div className="mb-4">
                            <Rating
                                onClick={handleRating}
                                initialValue={rating}
                                size={30}
                                allowHover
                                SVGstyle={{ display: 'inline-block' }}
                                transition
                            />
                        </div>

                        {/* Review Text */}
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows={4}
                            placeholder="Write your review here..."
                            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 text-xs"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReview}
                                className="px-4 py-2 bg-black text-white rounded-md hover:bg-black cursor-pointer text-xs"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ratings;
