export function procyclingService($q, $log, $http) {
  'ngInject'

  const service = {
    getStage: getStage,
    makeUrl: makeUrl
  }

  return service
}