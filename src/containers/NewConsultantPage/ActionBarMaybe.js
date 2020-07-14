import React from 'react';
import { bool, oneOfType, object } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import {
  LISTING_STATE_PENDING_APPROVAL,
  LISTING_STATE_CLOSED,
  LISTING_STATE_DRAFT,
  propTypes,
} from '../../util/types';
import { NamedLink } from '../../components';
import EditIcon from './EditIcon';

import css from './NewConsultantPage.css';

export const ActionBarMaybe = props => {
  const { isOwnListing, listing, editParams } = props;
  const state = listing.attributes.state;
  const isPendingApproval = state === LISTING_STATE_PENDING_APPROVAL;
  const isClosed = state === LISTING_STATE_CLOSED;
  const isDraft = state === LISTING_STATE_DRAFT;

  if (isOwnListing) {
    let ownListingTextTranslationId = 'NewConsultantPage.ownListing';

    if (isPendingApproval) {
      ownListingTextTranslationId = 'NewConsultantPage.ownListingPendingApproval';
    } else if (isClosed) {
      ownListingTextTranslationId = 'NewConsultantPage.ownClosedListing';
    } else if (isDraft) {
      ownListingTextTranslationId = 'NewConsultantPage.ownListingDraft';
    }

    const message = isDraft ? 'NewConsultantPage.finishListing' : 'NewConsultantPage.editListing';

    const ownListingTextClasses = classNames(css.ownListingText, {
      [css.ownListingTextPendingApproval]: isPendingApproval,
    });

    return (
      <div className={css.actionBar}>
        <p className={ownListingTextClasses}>
          <FormattedMessage id={ownListingTextTranslationId} />
        </p>
        <NamedLink className={css.editListingLink} name="EditNewConsultantPage" params={editParams}>
          <EditIcon className={css.editIcon} />
          <FormattedMessage id={message} />
        </NamedLink>
      </div>
    );
  } else if (isClosed) {
    return (
      <div className={css.actionBar}>
        <p className={css.closedListingText}>
          <FormattedMessage id="NewConsultantPage.closedListing" />
        </p>
      </div>
    );
  }
  return null;
};

ActionBarMaybe.propTypes = {
  isOwnListing: bool.isRequired,
  listing: oneOfType([propTypes.listing, propTypes.ownListing]).isRequired,
  editParams: object.isRequired,
};

ActionBarMaybe.displayName = 'ActionBarMaybe';

export default ActionBarMaybe;
