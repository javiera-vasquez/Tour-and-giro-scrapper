// for (type in a) {console.log(type, a[type])}
// var tmp = document.implementation.createHTMLDocument();
// tmp.body.innerHTML = response.data;

var navSelector = '.ResultQuickNav'

var scrapper = {

  mapNames: function (selector) {
    var list = {};

    $(selector).each(function () {
      list[$(this).text()] = $(this).attr('href').split('id=')[1]
    });

    return this.sections = list;
  },

  mapTimes: function (id, type) {
    var position = [];
    var selector = '.res' + id + ' li';

    $(selector).each(function () {
      //console.log($(this).children('span'));
      var childrens = $(this).children('span');
      //console.log(childrens.children()[0].outerText, childrens.children()[2].outerText);
      var obj = {
        position: childrens[0].outerText,
        name: (type === 'Teams') ? childrens[1].outerText : childrens.children()[0].outerText,
        team: (type === 'Teams') ? '' : childrens.children()[2].outerText,
        time: childrens[2].outerText
      }
      position.push(obj);
    })

    return position;
  },

  setResults: function (params) {
    var obj = {};
    // Init obj map
    this.mapNames(params);
    // loop n times for each section
    for(section in this.sections) {
      obj[section] = this.mapTimes(this.sections[section], section);
    }
    return this.stageResults = obj;
  },

  getResult: function () {
    return this.stageResults;
  }

}


