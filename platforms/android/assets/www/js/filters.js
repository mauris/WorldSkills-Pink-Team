angular.module('pinkTeam.filters', [])

.filter('age', function() {
  function calculateAge(birthday) {
  	birthday = new Date(birthday);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return function(birthdate) {
    return calculateAge(birthdate);
	};
});
