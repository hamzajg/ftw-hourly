import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { Reviews } from '../../components';

import css from './NewConsultantPage.css';

const SectionReviews = props => {
  const { reviews, fetchReviewsError } = props;

  const reviewsError = (
    <h2 className={css.errorText}>
      <FormattedMessage id="NewConsultantPage.reviewsError" />
    </h2>
  );

  return (
    <div className={css.sectionReviews}>
      <h2 className={css.reviewsHeading}>
        <FormattedMessage id="NewConsultantPage.reviewsHeading" values={{ count: reviews.length }} />
      </h2>
      {fetchReviewsError ? reviewsError : null}
      <Reviews reviews={reviews} />
    </div>
  );
};

export default SectionReviews;
