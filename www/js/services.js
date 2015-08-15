angular.module('pinkTeam.services', [])

.factory('users', function() {
  return [
    {
      id: 123,
      name: "Karen Maple",
      birthday: '10/05/1996',
      gender: "female",
      location: {lat:-23.516322, lng:-46.636582},
      status: "married",
      typeOfIssue: "Cervical",
      treatment: "Surgery",
      numberOfChildren: 0,
      role: "angel",
      state: "São Paulo",
      religion: "Catholic",
      music: [
        "Alternative",
        "Fall Out Boy",
        "David Archuleta",
        "The Fray",
        "Muse"
      ],
      movies: [
        "Spirited Away",
        "We Were Soldiers",
        "Zombieland",
        "Batman: The Dark Knight",
        "Harry Potter",
        "Empire of the Sun"
      ]
    },
    {
      id: 321,
      name: "Felipe Mentos",
      birthday: '12/10/1998',
      gender: "male",
      location: {lat:-23.516361, lng:-46.626068},
      status: "single",
      typeOfIssue: "Cervical",
      treatment: "Surgery",
      numberOfChildren: 2,
      role: "angel",
      state: "São Paulo",
      religion: "Christian",
      music: [
        "My Chemical Romance",
        "Fall Out Boy",
        "Cascada",
        "David Archuleta",
        "The Fray"
      ],
      movies: [
        "We Were Soldiers",
        "Zombieland",
        "Call of Duty",
        "Batman: The Dark Knight",
        "Empire of the Sun"
      ]
    },
    {
      id: 1234,
      name: "Leonardo Adams",
      birthday: '10/05/1993',
      gender: "female",
      location: {lat:-23.521634, lng:-46.623837},
      status: "single",
      typeOfIssue: "Ovarian",
      treatment: "Chemotherapy",
      numberOfChildren: 0,
      role: "angel",
      state: "Rio de Janeiro",
      religion: "Catholic",
      music: [
        "Rock",
        "Adam Levine",
        "Katy Perry",
        "David Archuleta",
        "The Fray"
      ],
      movies: [
        "Spirited Away",
        "We Were Soldiers",
        "Zombieland",
        "The Transporter",
        "Empire of the Sun"
      ]
    },
    {
      id: 123123,
      name: "Sam Porco",
      birthday: '10/05/1973',
      gender: "male",
      location: {lat:-23.521359, lng:-46.630478},
      status: "single",
      typeOfIssue: "Prostate",
      treatment: "Surgery",
      numberOfChildren: 1,
      role: "angel",
      state: "Minas Gerais",
      religion: "Itchias",
      music: [
        "Jazz",
        "Maroon 5",
        "Fall Out Boy",
        "Katy Perry",
        "David Archuleta",
        "The Fray"
      ],
      movies: [
        "Spirited Away",
        "We Were Soldiers",
        "Harry Potter",
        "Call of Duty",
        "Zombieland",
        "Empire of the Sun"
      ]
    },
    // {
    //     gender: "male",
    //     location: {lat:-23.52677, lng:-46.664291},
    //     status: "married",
    //     typeOfIssue: "Pancreatic",
    //     treatment: "Surgery",
    //     numberOfChildren: 1,
    //     role: "fighter"
    // },

    {
      id: 41231,
      name: "Natã Santos",
      birthday: '05/05/1800',
      gender: "male",
      location: {lat:-23.571691, lng:-46.646303},
      status: "married",
      typeOfIssue: "Stomach",
      treatment: "Surgery",
      numberOfChildren: 3,
      state: "São Paulo",
      role: "fighter",
      state: "Acre",
      religion: "Catholic",
      music: [
        "Trance music",
        "Fall Out Boy",
        "Katy Perry",
        "David Archuleta",
        "The Fray"
      ],
      movies: [
        "Spirited Away",
        "The LEGO Movie",
        "We Were Soldiers",
        "Zombieland",
        "Empire of the Sun"
      ]
    }
  ]
})

.factory('nearestNeighbor', function() {
  var recordSimilarity = function(a, b, fields) {
    var i = 0;
    var measure;
    var name;
    var similarity;
    var sum = 0;
    var unmatchedFields = {};

    while (i < fields.length) {
      name = fields[i].name;
      measure = fields[i].measure;
      if ('' + measure === '' + comparisonMethods.number) {
        if (typeof fields[i].max !== 'undefined' && fields[i].max !== null) {
          similarity = measure(a[name], b[name], fields[i].max);
        } else {
          console.warn("max number missing, falling back to max: 9007199254740992");
          similarity = measure(a[name], b[name], 9007199254740992);
        }
      } else {
        similarity = measure(a[name], b[name]);
      }

      if (similarity < 1.0) {
        unmatchedFields[name] = similarity;
      }

      sum += similarity;
      i++;
    }
    return [sum / fields.length, unmatchedFields];
  };

  var exactSimilarity = function(a, b) {
    var _ref;

    return (_ref = a === b) != null ? _ref : {
      1: 0
    };
  };

  var wordSimilarity = function(a, b) {
    var left, middle, right;

    left = tokenize(a);
    right = tokenize(b);
    middle = intersect(left, right);
    return (2 * middle.length) / (left.length + right.length);
  };

  var wordArraySimilarity = function(a, b) {
    var i, similarity;

    if (a.length === b.length) {
      i = 0;
      similarity = 0;
      while (i < a.length) {
        similarity += wordSimilarity(a[i], b[i]);
        i++;
      }
      return similarity / a.length;
    }
    return 0;
  };

  var ipSimilarity = function(a, b) {
    var diff, diff1, diff2, diffs, distance, i, left, right;

    left = a.split(".");
    right = b.split(".");
    diffs = [];
    i = 0;
    while (i < 4) {
      diff1 = 255 - left[i];
      diff2 = 255 - right[i];
      diff = Math.abs(diff2 - diff1);
      diffs[i] = diff;
      i++;
    }
    distance = calculateSum(diffs) / (255 * 4);
    return 1 - distance;
  };

  var ipArraySimilarity = function(a, b) {
    var i, num, similarity;

    if (a.length === b.length) {
      i = 0;
      similarity = 0;
      num = 0;
      while (i < a.length) {
        if (a[i].match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/) !== null && b[i].match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/) !== null) {
          similarity += ipSimilarity(a[i], b[i]);
          num++;
        }
        i++;
      }
      return similarity / num;
    }
    return 0;
  };

  var numberSimilarity = function(a, b, max) {
    var diff, diff1, diff2, distance;

    diff1 = max - a;
    diff2 = max - b;
    diff = Math.abs(diff2 - diff1);
    distance = diff / max;
    return 1 - distance;
  };

  var tokenize = function(string) {
    var i, tokens;

    tokens = [];
    if (typeof string !== 'undefined' && string !== null) {
      i = 0;
      while (i < string.length - 1) {
        tokens.push(string.substr(i, 2).toLowerCase());
        i++;
      }
    }
    return tokens.sort();
  };

  var intersect = function(a, b) {
    var ai, bi, result;

    ai = 0;
    bi = 0;
    result = new Array();
    while (ai < a.length && bi < b.length) {
      if (a[ai] < b[bi]) {
        ai++;
      } else if (a[ai] > b[bi]) {
        bi++;
      } else {
        result.push(a[ai]);
        ai++;
        bi++;
      }
    }
    return result;
  };

  var calculateSum = function(items) {
    var i, sum;

    sum = 0;
    i = 0;
    while (i < items.length) {
      sum += items[i];
      i++;
    }
    return sum;
  };

  var comparisonMethods = {
    exact: exactSimilarity,
    word: wordSimilarity,
    wordArray: wordArraySimilarity,
    ip: ipSimilarity,
    ipArray: ipArraySimilarity,
    number: numberSimilarity
  };

  var findMostSimilar = function(query, items, fields, callback) {
    var i, item, maxSimilarity, result, similarity, unmatchedFields, _ref;

    maxSimilarity = 0;
    result = [];
    i = 0;
    while (i < items.length) {
      item = items[i];
      _ref = recordSimilarity(item, query, fields), similarity = _ref[0], unmatchedFields = _ref[1];

      item.similarity = 0;
      if ( isFinite(similarity) ) {
        item.similarity = similarity;
      }

      maxSimilarity = similarity;
      result.push(item);
      i++;
    }
    return callback(result, maxSimilarity, unmatchedFields);
  };


  return {
    comparisonMethods: comparisonMethods,
    findMostSimilar: findMostSimilar
  };
});
