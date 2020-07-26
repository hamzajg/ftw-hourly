import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
  NamedLink,
} from '../../components';

import css from './SurveyPage.css';
import image from './survey-1056.jpg';
import { FormattedMessage } from '../../util/reactIntl';

const SurveyPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="Survey"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'SurveyPage',
        description: 'Survey',
        name: 'Survey page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Sample Survey</h1>

          <div className={css.contentWrapper}>
            <div className={css.contentMain}>
              <h2 className={css.subtitle}>Please answer the questions to help us providing usefull service.</h2>

              <p>Q1: xxxxxxxxx</p>
              <p></p>

              <p>Q2: xxxxxxxxx</p>

              <NamedLink
                name="SurveyPage"
                to={{
                  search:
                    'service=PREGNANCY & POSTPARTUM',
                }}
                className={css.heroButton}
              >
                <FormattedMessage id="Survey.sendButton" />
              </NamedLink>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default SurveyPage;
