import { useState, useEffect, useRef } from "react";
// import isEqual from "lodash/isEqual";
const CACHE = {};

export default function useStaleRefresh(url:any, defaultValue = []) {
  const [data, setData] = useState(defaultValue);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // cacheID is how a cache is identified against a unique request
    const cacheID = url;
    // look in cache and set response if present
    if (CACHE[cacheID] !== undefined) {
      setData(CACHE[cacheID]);
      setLoading(false);
    } else {
      // else make sure loading set to true
      setLoading(true);
    }
    // fetch new data

    (typeof url=="string"?fetch(url):url).then(newData => {
      CACHE[cacheID] = newData.data;
      setData(newData.data);
      setLoading(false);
    });
  }, [url]);

  return [data, isLoading];
}

const MemoryCache = {
  data: {},
  set(key, value, maxAge) { //  Save the data 
    this.data[key] = {
      maxAge: maxAge || 0,
      value,
      now: Date.now(),
     };
  },
  get(key) { //  Get specified from cache  key  Corresponding value .
    const cachedItem = this.data[key];
    if (!cachedItem) return null;
    const isExpired = Date.now() - cachedItem.now > cachedItem.maxAge;
    isExpired && this.delete(key);
    return isExpired ? null : cachedItem.value;
  },
  delete(key) { //  Remove the specified... From the cache  key  Corresponding value .
    return delete this.data[key];
  },
  clear() { //  Clear cached data .
    this.data = {};
  },
};