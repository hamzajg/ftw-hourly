import React, { useState } from 'react';
import {
  Footer, LayoutSingleColumn,
  LayoutWrapperFooter, LayoutWrapperMain, LayoutWrapperTopbar,
  NamedLink,
} from '../../components';
import config from '../../config';
import { StaticPage, TopbarContainer } from '../../containers';
import { twitterPageURL } from '../../util/urlHelpers';
import css from './SurveyPage.css';

import { FormattedMessage } from '../../util/reactIntl';

const SurveyPage = () => {
  const [result, setResult] = useState(undefined);
  const [next, setNext] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [tmp, setTmp] = useState(undefined);
  const [reaniningMonths, setReaniningMonths] = useState(undefined);
  const [selectedService, setSelectedService] = useState(undefined);
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  const Quiz = () => {
    return (
      <div>

        <p>Is the baby born?</p>
      </div>
    );
  }
  const EndQuiz = () => {
    return (
      <div><NamedLink
        name="ConsultantsPage"
        to={{
          search:
            'service=' + selectedService,
        }}
        className={css.heroButton}
      >
        <FormattedMessage id="Survey.sendButton" />
      </NamedLink>
      </div>
    );
  }
  const BabyIsBorn = () => {
    return (
      <TypeAge />
    );
  }

  const AgeHigherThanTwoMonths = () => {
    return (
      <div>
        <p> Age Higher 2 months</p>
        <ChooseBetweenServices props={{ services: ['Breastfeeding', 'Sleep Coaching', 'Mental Health', 'Physical Therapy'] }} />
      </div>
    )
  }
  const AgeLessThanTwoMonths = () => {
    return (
      <div>
        <p> Age Higher 2 months</p>
        <ChooseBetweenServices props={{
          services: ['Pregnancy & Postpartum', 'Sleep Coaching', 'Mental Health',
            'Physical Therapy']
        }} />
      </div>
    )
  }

  const TypeAge = () => {
    return (
      <div>
        <p> Type Age: </p>
        <input type='number' value={age} onChange={e => { setNext(undefined); setAge(parseInt(e.target.value)) }} />
      </div>
    );
  }

  const TypeReaniningMonths = () => {
    return (
      <div>
        <p> Type Reanining Months: </p>
        <input type='number' value={reaniningMonths} onChange={e => { setNext(undefined); setReaniningMonths(parseInt(e.target.value)) }} />
      </div>
    );
  }

  const BabyNotBorn = () => {
    return (
      <TypeReaniningMonths />
    );
  }
  const ChooseBetweenServices = (props) => {
    const { services } = props.props;
    return (
      <ul>
        {services.map((value, index) => <li> <input id='service' name='service' type='radio' value={value} checked={tmp !== undefined || index==0} onChange={e => { setTmp(e.currentTarget.value); }} /><span>{value}</span></li>)}
      </ul>
    );
  }
  const beginQuiz = () => {
    return result === undefined;
  }
  const endQuiz = () => {
    return next && selectedService !== undefined;
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
          <h1 className={css.pageTitle}>Quick Survey </h1>

          <div className={css.contentWrapper}>
            <div className={css.contentMain}>
            <h2 className={css.subtitle}>Please answer the questions to determine the recommanded services.</h2>

              {beginQuiz() && <Quiz />}
              {selectedService === undefined && next === undefined && result === false && <BabyNotBorn />}
              {selectedService === undefined && next && result === false && reaniningMonths !== undefined &&
                <ChooseBetweenServices props={{
                  services: ['Pregnancy & Postpartum', 'Sleep Coaching', 'Mental Health',
                    'Physical Therapy']
                }} />}
              {selectedService === undefined && next === undefined && result === true && <BabyIsBorn />}
              {selectedService === undefined && next && result === true && age > 2 && <AgeHigherThanTwoMonths />}
              {selectedService === undefined && next && result === true && age <= 2 && <AgeLessThanTwoMonths />}
              {endQuiz() && <EndQuiz />}
              {/* {result !== undefined && <button onClick={() => setNext(undefined)}>Back</button>} */}
              {result !== undefined && selectedService === undefined && <button onClick={() => {setNext(true); setSelectedService(tmp)}}>Next</button>}
              {result === undefined && <button className='btn btn-primary' onClick={() => setResult(true)}>Yes</button>}
              {result === undefined && <button className='btn btn-primary' onClick={() => setResult(false)}>No</button>}
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
