/* eslint-env browser */
/* global sharetribeSdk */

(() => {
  const getToken = (TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET) => {
    var identity = "hamza";//faker.name.findName();

    console.log(Twilio);
    Twilio.Video.connect('e70ff3badb6454be3c3746f2ecf01dbc', { name:'my-new-room' }).then(room => {
      console.log(`Successfully joined a Room: ${room}`);
      room.on('participantConnected', participant => {
        console.log(`A remote Participant connected: ${participant}`);
      });
    }, error => {
      console.error(`Unable to connect to Room: ${error.message}`);
    });
    var AccessToken = Twilio.jwt.AccessToken;
    var VideoGrant = AccessToken.VideoGrant;
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    var token = new AccessToken(
      TWILIO_ACCOUNT_SID,
      TWILIO_API_KEY_SID,
      TWILIO_API_KEY_SECRET
    );

    // Assign the generated identity to the token
    token.identity = identity;

    const grant = new VideoGrant();
    // Grant token access to the Video API features
    token.addGrant(grant);
    renderTwilio(identity, token.toJwt)
    console.log(`identity: ${identity}`);
    console.log(`token: ${token.toJwt}`);
  };
  //
  // Helpers
  //

  const parseParams = qs => {
    if (qs && qs.length) {
      return qs
        .substr(1)
        .split('&')
        .reduce((params, kv) => {
          const [k, v] = kv.split('=');
          return Object.assign({}, params, { [k]: decodeURIComponent(v) });
        }, {});
    }

    return {};
  };

  const groupById = entities =>
    entities.reduce(
      (lookupMap, entity) => Object.assign({}, lookupMap, { [entity.id.uuid]: entity }),
      {}
    );

  const formatMoney = money => {
    // Be careful!!
    //
    // The division by hundred enters to the world of floating-points.
    // In production software, it's recommended to use a library like decimal.js to handle money calculations
    //
    // See more: https://github.com/MikeMcl/decimal.js/
    //
    const majorUnitAmount = money.amount / 100;

    return `${majorUnitAmount} ${money.currency}`;
  };

  //
  // Rendering functions
  //

  const mainDiv = document.querySelector('.main');

  const renderStatus = response => {
    const statusTemplate = document.querySelector('.status');
    const elem = statusTemplate.content.cloneNode(true);

    elem.querySelector('.status-status').textContent = `${response.status} ${response.statusText}`;

    mainDiv.appendChild(elem);
  };

  const renderMeta = response => {
    const metaTemplate = document.querySelector('.meta');
    const elem = metaTemplate.content.cloneNode(true);
    const { meta } = response.data;

    elem.querySelector('.meta-total-items').textContent = meta.totalItems;
    elem.querySelector('.meta-page').textContent = `${meta.page} / ${meta.totalPages}`;
    elem.querySelector('.meta-per-page').textContent = meta.perPage;

    mainDiv.appendChild(elem);
  };
  const renderTwilio = response => {
    const metaTemplate = document.querySelector('.twilio');
    const elem = metaTemplate.content.cloneNode(true);
    const { meta } = response.data;

    elem.querySelector('.twilio-identity').textContent = meta.identity;
    elem.querySelector('.twilio-token').textContent = meta.token;

    mainDiv.appendChild(elem);
  };

  const renderData = response => {
    // Group images by ID for easy and fast lookup
    const { included } = response.data;
    const images = included ? groupById(included.filter(entity => entity.type === 'image')) : {};

    const listingsTemplate = document.querySelector('.listings');
    const listingsContainerElem = listingsTemplate.content.cloneNode(true);

    const listingTemplate = document.querySelector('.listing');

    response.data.data.forEach(listing => {
      const elem = listingTemplate.content.cloneNode(true);

      elem.querySelector('.listing-title').textContent = `${
        listing.attributes.title
        }, ${formatMoney(listing.attributes.price)}`;
      elem.querySelector('.listing-id').textContent = listing.id.uuid;
      elem.querySelector('.listing-geolocation').textContent = listing.attributes.geolocation
        ? `${listing.attributes.geolocation.lat},${listing.attributes.geolocation.lng}`
        : 'No location';
      elem.querySelector('.listing-created-at').textContent = listing.attributes.createdAt;
      elem.querySelector('.listing-state').textContent = listing.attributes.state;

      const imagesElem = elem.querySelector('.listing-images');

      listing.relationships.images.data.forEach(img => {
        const image = images[img.id.uuid];
        const listingImageElem = document.createElement('img');
        listingImageElem.src = image.attributes.variants.default.url;
        imagesElem.appendChild(listingImageElem);
      });

      listingsContainerElem.querySelector('.listings-listings').appendChild(elem);
    });

    mainDiv.appendChild(listingsContainerElem);
  };

  const renderForm = () => {
    const formTemplate = document.querySelector('.form');
    const elem = formTemplate.content.cloneNode(true);
    mainDiv.appendChild(elem);
  };

  //
  // Do the request
  //

  const doRequest = clientId => {
    // Create new SDK instance using the given clientId
    const sdk = sharetribeSdk.createInstance({
      clientId,
    });

    // Call method sdk.listings.query with params include=images and
    // per_page=5
    //
    // This will call the following API endpoint:
    //
    // /listings/query?include=images&per_page=5
    //
    // Returns a Promise.
    //
    sdk.listings
      .query({ include: 'images', per_page: 5 })
      .then(response => {
        // Successful response
        //
        // Render the response
        //
        renderStatus(response);
        renderMeta(response);
        renderData(response);
      })
      .catch(response => {
        // An error occurred
        renderStatus(response);
      });
  };

  const params = parseParams(window.location.search);

  if (params.client_id) {
    doRequest(params.client_id);
  } else {
    renderForm();
  }
  if (params.TWILIO_ACCOUNT_SID && params.TWILIO_API_KEY_SID && params.TWILIO_API_KEY_SECRET)
    getToken(params.TWILIO_ACCOUNT_SID, params.TWILIO_API_KEY_SID, params.TWILIO_API_KEY_SECRET);
})();