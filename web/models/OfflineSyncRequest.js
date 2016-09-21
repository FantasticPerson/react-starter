export default class OfflineRequest {
}

//just for ide.
OfflineRequest.store = null;

OfflineRequest.add = (item) => {
  OfflineRequest.store.add(item)
    .catch(err=>{
      console.warn(`OfflineRequest add err ${err}`);
    })
}

OfflineRequest.getFirst = ()=> {
  return OfflineRequest.store.orderBy('time').last();
};

OfflineRequest.delete = (id)=> {
  return OfflineRequest.store.delete(id);
};
