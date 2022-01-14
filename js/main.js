function myLog(s) {
    console.log(s);
}

$(document).ready(function() {
	$('form').submit(function(e) {
		e.preventDefault();

        myLog('We submit!');
	});
});
