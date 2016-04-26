export class MainController {
  constructor($log, $timeout, $http, scrapperService) {
    'ngInject';

    this.activate($timeout, $http, $log, scrapperService);

  }

  activate($timeout, $http, $log, scrapperService) {
    // this.get($http, $log, scrapperService);
  }

  get($http, $log, scrapperService) {
    $http.get('http://www.procyclingstats.com/mob/race.php?t=r&id=156770')
      .then((res) => {
        //$log.debug(scrapperService);
        scrapperService.setResults(res, scrapperService.params);
      }, (error) => {
        $log.debug('error', error);
      });
  }

}
