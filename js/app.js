var model = {
    currentCat: null,
    content: [
      {name: 'theCat1', clicks: 0, picture: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'},
      {name: 'theCat2', clicks: 0, picture: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'},
      {name: 'theCat3', clicks: 0, picture: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'},
      {name: 'theCat4', clicks: 0, picture: 'https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640'},
      {name: 'theCat5', clicks: 0, picture: 'https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480'}
    ],

    findByName: function(name) {
      return model.content.find(function(el) {
        return el.name === name;
      });
    },

    all: function() {
      return model.content;
    },


  }

  var octopus = {
    init: function() {
      catView.init();

      ko.applyBindings(new catsListViewKo());

      // catsListView.init();
      // catAdminView.init();
      // catView.init();
    },

    getCurrCat: function() {
      return model.currentCat;
    },

    setCurrCat: function(cat) {
      model.currentCat = cat;
    },

    getCats: function() {
      return model.all();
    },

    increaseCount: function() {
      var currCat = octopus.getCurrCat();
      currCat.clicks += 1;
      catView.render();
    }
  };

  var catsListView = {
    init: function() {
      this.catsBtns = document.getElementById('catsBtns');
      // this.render();
    },

    render: function() {
      model.all().forEach(function(cat) {
        var btn = document.createElement('li');
        btn.textContent = cat.name;
        btn.addEventListener('click', (function(catCopy) {
          return function (e) {
            e.preventDefault();
            octopus.setCurrCat(catCopy);
            catView.render();
          };
        })(cat));
        this.catsBtns.appendChild(btn);
      });
    }
  };

  var catAdminView = {
    init: function() {
      this.adminBtn = document.getElementById('adminBtn');
      this.catAdminForm = document.getElementById('catAdminForm');
      this.catInputName = document.getElementById('catInputName');
      this.catClickCount = document.getElementById('catClickCount');
      this.catInputImg = document.getElementById('catInputImg');
      this.catAdminCancelBtn = document.getElementById('catAdminCancelBtn');
      this.catAdminSubmitBtn = document.getElementById('catAdminSubmitBtn');

      this.render();
    },
    render: function() {
      catAdminView.adminBtn.addEventListener('click', function(e) {
        e.preventDefault();
        catAdminView.toggle();
      });

      catAdminView.catAdminForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!octopus.getCurrCat()) {
          return alert('Please select cat!');
        }

        var currCat = octopus.getCurrCat();
        currCat.name = this.catInputName.value;
        currCat.clicks = this.catClickCount.value || 0;
        currCat.picture = this.catInputImg.value;

        catView.render();
      });
    },

    toggle: function() {
      var className = catAdminView.catAdminForm.className,
          toggledClassName;
      if (className.match('hide')) {
        toggledClassName = 'show';
      } else {
        toggledClassName = 'hide';
      }
      catAdminView.catAdminForm.className = toggledClassName;
    }
  };

  var theCat = function () {
    var self = this;
    self.catName = ko.observable();
    self.catPic = ko.observable();
    self.catClickCount = ko.observable();
  };

var catsListViewKo = function() {
  var self = this;

  self.cats = ko.observableArray(model.content);
  self.showCat = function() {
    console.log(this)
    octopus.setCurrCat(this);
    catView.render();
  };
};


  var catView = {
    init: function() {
      this.catName = document.getElementById('catName');
      this.catClickCount = document.getElementById('catClickCount');
      this.catPic = document.getElementById('catPic');

      this.catPic.addEventListener('click', function(e) {
        e.preventDefault();
        octopus.increaseCount();
      });
    },

    render: function() {
      var currCat = octopus.getCurrCat();

      catView.catName.textContent = currCat.name;
      catView.catClickCount.textContent = currCat.clicks;
      catView.catPic.src = currCat.picture;
    }
  };

  octopus.init();
