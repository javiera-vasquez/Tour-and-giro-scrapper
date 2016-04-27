export function tourService($http, $q, $log) {
  'ngInject'

  const service = {
    getStages: getStages
  };

  return service;

  function getStages() {
    let url = './assets/stages.json'
    let deferred = $q.defer();

    $http.get(url)
      .then(respond => {
        //$log.debug(respond.data);
        deferred.resolve(respond.data);
      }, error => {
        deferred.resolve(error);
    });

    return deferred.promise;
  }

}

// Scrapper of stages
// var array = [];

// $('.basiclist li').each(function (i, el) {
//   var obj = {
//     stage: $(el).children().text().split('-')[0],
//     name: $(el).children().text().split('-')[1],
//     request_id: $(el).children().attr('href').split('?id=')[1]
//   }
//   array.push(obj);
// })