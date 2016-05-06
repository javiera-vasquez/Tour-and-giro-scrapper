import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
// Controllers
import { MainController } from './main/main.controller';
// Services
import { procyclingService } from './services/procycling.service';
//import { scrapperService } from './services/scrapper.service';
import { tourService } from './services/tour.service'
// Directives

angular.module('tour', ['ngAnimate', 'ngSanitize', 'ui.router', 'toastr', 'ngCsv'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .factory('tourService', tourService)
  //.factory('scrapperService', scrapperService)
  .factory('procyclingService', procyclingService)
  .controller('MainController', MainController)
