import React from 'react';
import moment from 'moment'

const Reviews = (props) => {
    const {
        details

    } = props
    console.log(details.reviews);
    return (
        <div className='reviews'>
            <h2>Reviews</h2>
            <div className='reviewContainer'>
                { details.reviews.map(review => (
                    <div className='review'>
                        <h3>{review.author}</h3>
                        <p className='date'>{moment(review.created_at).format('MMMM Do YYYY')}</p>
                        <p>{review.content}</p>
                    </div>

                )) }
            </div>
        </div>
    )
}

export default Reviews
