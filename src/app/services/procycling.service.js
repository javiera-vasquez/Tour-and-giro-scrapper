export function procyclingService($q, $log, $http) {
  'ngInject'

  const service = {
    makeUrl: makeUrl,
    getStage: getStage
  };

  return service;

  function makeUrl(id) {
    return 'http://localhost:4000/' + id;
  }

  function getStage(id) {
    let path = makeUrl(id);
    let deferred = $q.defer();

    $http.get(path).then(respond => {
      //$log.debug(respond.data);
      deferred.resolve(respond.data);
    }, error => {
      deferred.resolve(error);
    });

    return deferred.promise;

  }

}