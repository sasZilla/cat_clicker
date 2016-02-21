// var model = {
//     currentCat: null,
//     content: [
//       {name: 'theCat1', clicks: 0, picture: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'},
//       {name: 'theCat2', clicks: 0, picture: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'},
//       {name: 'theCat3', clicks: 0, picture: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'},
//       {name: 'theCat4', clicks: 0, picture: 'https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640'},
//       {name: 'theCat5', clicks: 0, picture: 'https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480'}
//     ],

//     findByName: function(name) {
//       return model.content.find(function(el) {
//         return el.name === name;
//       });
//     },

//     all: function() {
//       return model.content;
//     },


//   }

var initialCatList = [
  {name: 'theCat1', clicks: 0, picture: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'},
  {name: 'theCat2', clicks: 0, picture: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'},
  {name: 'theCat3', clicks: 0, picture: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'},
  {name: 'theCat4', clicks: 0, picture: 'https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640'},
  {name: 'theCat5', clicks: 0, picture: 'https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480'}
];


var Cat = function(data) {
  var self = this;

  self.catName = ko.observable(data.name);
  self.catImg = ko.observable(data.picture);
  self.clickCount = ko.observable(data.clicks);

  self.cats = ko.observableArray(['theCat1', 'theCat2', 'theCat3' , 'theCat4', 'theCat5'])
};

var ViewModel = function() {
  var self = this;

  self.catList = ko.observableArray([]);

  initialCatList.forEach(function(catData) {
    self.catList.push( new Cat(catData) );
  });

  self.currCat = ko.observable( self.catList()[0] );

  self.increaseCounts = function() {
    self.currCat().clickCount( self.currCat().clickCount() + 1 );
  };

  self.setCurrent = function(catObj) {
    self.currCat(catObj);
  };
};

ko.applyBindings( new ViewModel() );
