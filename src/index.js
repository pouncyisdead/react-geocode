/**
 * Geocode Module
 *
 * @package react-geocode
 * @author  Pir Shukarulalh Shah <shuker_rashdi@hotmail.com>  (http://www.shukarullah.com)
 */

/** @type {boolean | null} */
let DEBUG = false;

/** @type {string | null} */
let API_KEY = null;

/** @type {string | null} */
let LANGUAGE = "en";

/** @type {string | number | boolean | null} */
let REGION = null;

/** @type {string | null} */
const GOOGLE_API = "https://maps.google.com/maps/api/geocode/json";

/**
 * @param {string} message
 * @param {boolean} warn
 * @returns {void}
 */
function log(message, warn = false) {
  if (DEBUG) {
    if (warn) {
      console.warn(message);
    } else {
      console.log(message);
    }
  }
}

/**
 * @param {RequestInfo} url
 * @returns {Promise<any>}
 */
async function handleUrl(url) {
  const response = await fetch(url).catch(() =>
    Promise.reject(new Error("Error fetching data"))
  );

  const json = await response.json().catch(() => {
    log("Error parsing server response");
    return Promise.reject(new Error("Error parsing server response"));
  });

  if (json.status === "OK") {
    log(json);
    return json;
  }
  log(
    `${json.error_message}.\nServer returned status code ${json.status}`,
    true
  );
  return Promise.reject(
    new Error(
      `${json.error_message}.\nServer returned status code ${json.status}`
    )
  );
}

/**
* @param {string} [apiKey]
* @param {string} [language]
* @param {string | null} [region]
* @returns {string}
*/
function buildQueryString(apiKey, language, region) {
 let queryString = "";

 if (apiKey || API_KEY) {
   API_KEY = apiKey || API_KEY;
   queryString += `&key=${API_KEY}`;
 }

 if (language || LANGUAGE) {
   LANGUAGE = language || LANGUAGE;
   queryString += `&language=${LANGUAGE}`;
 }

 if (region || REGION) {
   REGION = region || REGION;
   // @ts-ignore
   queryString += `&region=${encodeURIComponent(REGION)}`;
 }

 return queryString;
}

/**
 * @namespace reactGeocode
 */
const reactGeocode = {
  /**
   * @param {string} apiKey
   * @returns {void}
   */
  setApiKey(apiKey) {
    API_KEY = apiKey;
  },

  /**
   * @param {string} language
   * @returns {void}
   */
  setLanguage(language) {
    LANGUAGE = language;
  },

  /**
   * @param {string} region
   * @returns {void}
   */
  setRegion(region) {
    REGION = region;
  },

  /**
   * @param {boolean} [flag=true]
   * @returns {void}
   */
  enableDebug(flag = true) {
    DEBUG = flag;
  },

  /**
   * @param {string} lat
   * @param {string} lng
   * @param {string} [apiKey]
   * @param {string} [language]
   * @param {string | null} [region]
   * @returns {Promise<any>}
   */
  async fromLatLng(lat, lng, apiKey, language, region) {
    if (!lat || !lng) {
      log("Provided coordinates are invalid", true);
      return Promise.reject(new Error("Provided coordinates are invalid"));
    }

    const latLng = `${lat},${lng}`;

    const url = `${GOOGLE_API}?latlng=${encodeURIComponent(latLng)}${buildQueryString(apiKey, language, region)}`;

    return handleUrl(url);
  },

  /**
   * @param {string} address
   * @param {string} [apiKey]
   * @param {string} [language]
   * @param {string | null} [region]
   * @returns {Promise<any>}
   */
  async fromAddress(address, apiKey, language, region) {
    if (!address) {
      log("Provided address is invalid", true);
      return Promise.reject(new Error("Provided address is invalid"));
    }

    const url = `${GOOGLE_API}?address=${encodeURIComponent(address)}${buildQueryString(apiKey, language, region)}`;

    return handleUrl(url);
  }
};

/**
 * @module 'react-geocode'
 */
export default reactGeocode;
