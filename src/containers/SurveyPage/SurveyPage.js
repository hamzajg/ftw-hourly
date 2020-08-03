import React, { useState } from 'react';
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
  const [result, setResult] = useState(undefined);
  const [next, setNext] = useState(false);
  const [age, setAge] = useState(undefined);
  const [reaniningMonths, setReaniningMonths] = useState(undefined);
  const [selectedService, setSelectedService] = useState(undefined);
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  const Quiz = () => {
    return (
      <div>
        <h2 className={css.subtitle}>Please answer the questions to help us providing usefull service.</h2>

        <p>Q1: xxxxxxxxx</p>
      </div>
    );
  }
  const EndQuiz = () => {
    setNext(false);
    return (
      <div>
        <h2> Thanks!!      </h2>
      </div>
    );
  }
  const BabyIsBorn = () => {
    setNext(false);
    return (
      <TypeAge />
    );
  }

  const AgeHigherThanTwoMonths = () => {
    setNext(false);
    return (
      <div>
        <p> Age Higher 2 months</p>
        <ChooseBetweenServices props={['Breastfeeding', 'Sleep Coaching', 'Mental Health', 'Physical Therapy']} />
      </div>
    )
  }
  const AgeLessThanTwoMonths = () => {
    setNext(false);
    return (
      <div>
        <p> Age Higher 2 months</p>
        <ChooseBetweenServices props={['Pregnancy & Postpartum', 'Sleep Coaching', 'Mental Health',
          'Physical Therapy']} />
      </div>
    )
  }

  const TypeAge = () => {
    setNext(false);
    return (
      <div>
        <p> Type Age: </p>
        <input value='number' onChange={e => setAge(e.target.value)} />
      </div>
    );
  }

  const TypeReaniningMonths = () => {
    setNext(false);
    return (
      <div>
        <p> Type Reanining Months: </p>
        <input value='number' onChange={e => setReaniningMonths(e.target.value)} />
      </div>
    );
  }

  const BabyNotBorn = () => {
    setNext(false);
    return (
      <TypeReaniningMonths />
    );
  }
  const ChooseBetweenServices = (services) => {
    setNext(false);
    return (
      services.map(x => <p>x</p>)
    );
  }
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
            {result === undefined && <Quiz />}
            {next && result === false && <BabyNotBorn />}
            {next && result === false && reaniningMonths !== undefined &&
              <ChooseBetweenServices props={['Pregnancy & Postpartum', 'Sleep Coaching', 'Mental Health',
                'Physical Therapy']} />}
            {next && result === true && <BabyIsBorn />}
            {next && result === true && age > 2 && <AgeHigherThanTwoMonths />}
            {next && result === true && age < 2 && <AgeLessThanTwoMonths />}
            {next && selectedService !== undefined && <EndQuiz />}
            <button onClick={setNext(true)}>Next</button>

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
