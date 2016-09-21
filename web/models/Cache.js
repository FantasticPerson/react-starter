export default class Cache {
  //get isExpire() {
  //  return Date.now > this.expire_at;
  //}

  get isValid() {
    return __LAUNCH_SESSION__ === this.session;
  }
}

//just for ide.
Cache.store = null;

Cache.findResult = (url_hash) => {
  return Cache.store.get(url_hash)
    .then(cache => {
      if(!cache || !cache.isValid) {
        return null;
      } else {
        return cache.result;
      }
    }, err => {
      console.warn('Cache findResult err', err);
      return null;
    })
};

//const CACHE_TIME = 1000 * 60 * 60 * 3;

Cache.saveResult = (url_hash, result) => {
  let item = {
    url_hash,
    result,
    session: __LAUNCH_SESSION__
  };

  return Cache.store.put(item)
    .then(()=>{
      return result;
    }, err => {
      console.warn('Cache saveResult error', err);
      return result;
    });
};
