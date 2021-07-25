import React from "react";
import { IReviewProps } from "../../Interfaces/Review/IReview";

const Review: React.FC<IReviewProps> = ({ imgUrl, alt }) => {
    return (
        <div className="review-component" data-testid="review-component">
            <img src={imgUrl} alt={alt} />
        </div>
    );
};

export default Review;
