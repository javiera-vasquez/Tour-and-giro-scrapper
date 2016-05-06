export class MainController {
  constructor($log, $element, $scope, tourService, procyclingService) {
    'ngInject';

    let mv = this;

    mv.tours = {};
    mv.race = {};
    mv.setRace = setRace;
    mv.setStage = setStage;
    mv.actualRace = 'Seleccionar Carrera';
    mv.actualStage = 'Seleccionar Etapa';
    mv.closeTips = false;
    mv.resolveStage = false;
    mv.spinner = false;

    activate();

    function activate() {
      return getstagesMap();
    }

    function getstagesMap() {
      return tourService.getStages().then((respond) => {
        $log.debug('map of stages', respond);
        mv.tours = respond;
      });
    }

    function getStage(id) {
      return procyclingService.getStage(id)
        .then(respond => {
          //$log.debug(respond);
          return respond;
        }, error => {
          $log.debug(error);
        });
    }

    function setRace(race) {
      // $log.debug(race);
      mv.actualRace = race.name;
      mv.race = race.stages;
      mv.actualStage = 'Seleccionar Etapa';
    }

    function setStage(id, name) {
      //$log.debug('undefined', mv.ranking)

      mv.actualStage = name;
      mv.spinner = !mv.spinner;

      if (mv.ranking !== undefined)
        mv.resolveStage = !mv.resolveStage;

      getStage(id).then((respond) => {
        mv.ranking = respond;
        $log.debug(mv.ranking.hasOwnProperty('GC'));
      }).finally(() => {
        if (!mv.ranking.hasOwnProperty('GC')) {
          $log.debug('asdf')
          mv.resolveStage = false;
          mv.spinner = false;
          mv.ranking = undefined;
        } else {
          mv.spinner = !mv.spinner;
          mv.resolveStage = !mv.resolveStage;
        }
      });
    }


  }

}

