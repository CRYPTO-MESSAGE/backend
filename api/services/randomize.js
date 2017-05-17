module.exports.nombreAleatoire = function (min, max, integer) {

     if (!integer) {
         return Math.random() * (max - min) + min;
     }
     else {
          return Math.round(Math.random() * (max - min) + min);
     }
}

module.exports.uniqueTime = function () {
	var start = new Date().getTime();

	return start;
}