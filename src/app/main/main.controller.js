export class MainController {
  constructor($log, $timeout, $http, webDevTec, toastr) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1461596771452;
    this.toastr = toastr;

    this.activate($timeout, webDevTec, $http, $log);

  }

  get($http, $log) {
    $log.debug($http)
    $http.get('http://www.procyclingstats.com/mob/race.php?t=r&id=156770').then((res) => {
      $log.debug(res)
    });
  }

  activate($timeout, webDevTec, $http, $log) {
    this.get($http, $log);
    this.getWebDevTec(webDevTec);
    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 4000);
  }

  getWebDevTec(webDevTec) {
    this.awesomeThings = webDevTec.getTec();

    angular.forEach(this.awesomeThings, (awesomeThing) => {
      awesomeThing.rank = Math.random();
    });
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
