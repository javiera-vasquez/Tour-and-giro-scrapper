export function scrapperService($log) {
  'ngInject'

  let paramsObj = {
    selector_names: '.ResultQuickNav',
    filter: 'Teams'
  }

  const service = {
    params: paramsObj,
    parseNames: parseNames,
    parseTimes: parseTimes,
    setResults: setResults,
    getResult: getResult
  };

  return service;

  function parseNames(html, selector) {
    let list = {};
    let element = $(html.body.children).find(selector);

    //$log.debug(element);

    element.each((i, el) => {
      //$log.debug('element', el);
      list[$(el).text()] = $(el).attr('href').split('id=')[1]
    });

    // $log.debug('list', list);
    return this.sections = list;
  }

  function parseTimes(html, id, type, filter) {
    let position = [];
    let selector = '.res' + id + ' li';
    let element = $(html.body.children).find(selector);

    element.each((i, el) => {
      let childrens = $(el).children('span');
      let obj = {
        position: childrens[0].outerText,
        name: (type !== filter) ? childrens.children()[0].outerText : '',
        team: (type !== filter) ? childrens.children()[2].outerText : childrens[1].outerText,
        time: childrens[2].outerText
      }
      //$log.debug(obj);
      position.push(obj);
    });

    return position;
  }

  function setResults(response) {
    let tmpObj = {};
    let tmpHTML = document.implementation.createHTMLDocument();

    // Link respond to fake html
    tmpHTML.body.innerHTML = response;

    // Init obj map
    this.parseNames(tmpHTML, this.params.selector_names);
    // loop n times for each section
    angular.forEach(this.sections, (value, key) => {
      tmpObj[key] = this.parseTimes(tmpHTML, value, key, this.params.filter);
    })

    // $log.debug(tmpObj);
    // return the obj map
    return this.stageResults = tmpObj;
  }

  function getResult() {
    return this.stageResults;
  }

}
