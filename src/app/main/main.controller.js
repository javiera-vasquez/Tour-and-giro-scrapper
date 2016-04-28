export class MainController {
  constructor($log, scrapperService, tourService, procyclingService) {
    'ngInject';

    let mv = this;

    mv.tours = {};
    mv.race = {};
    mv.ranking = {};
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
      return procyclingService.getStage(id).then(respond => {
        //$log.debug(respond);
        return scrapperService.setResults(respond);
      }, error => {
        $log.debug(error);
      });
    }

    function setRace(race) {
      // $log.debug(race);
      mv.actualRace = race.name;
      mv.race = race.stages;
      mv.actualStage = 'Seleccionar Etapa';
      return;
    }

    function setStage(id, name) {
      $log.debug(id);
      mv.actualStage = name;
      mv.spinner = !mv.spinner;
      getStage(id).then((respond) => {
        mv.ranking = respond;
        $log.debug(mv.ranking);
      }).finally(() => {
        mv.spinner = !mv.spinner;
        mv.resolveStage = !mv.resolveStage;
      });
      return;
    }



  }

}

