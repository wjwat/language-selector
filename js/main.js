let myLog = console.log;

function getVal(sel) {
    return $(sel).val();
}

$(document).ready(function() {
	$('form').submit(function(e) {
		e.preventDefault();
        let username = getVal('input#username');
        let bdfl = getVal('input:radio[name="bdfl"]:checked');
        let typing = getVal('input:radio[name="typing"]:checked');
        let color = getVal('select#colors option:selected');
        let indentation = getVal('select#indentation option:selected');
        let meal = getVal('select#meal option:selected');

        // python, ruby, javascript
        let py = 0;
        let ru = 0;
        let js = 0;

        // let color = $('select#colors option:selected');

        [bdfl, typing, color, indentation, meal].forEach(function(item) {
            if (color === 'Python') {
                py += 1;
            } else if (color === 'Ruby') {
                ru += 1;
            } else {
                js += 1;
            }
        });

        myLog(py, ru, js);
	});
});
