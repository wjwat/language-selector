let myLog = console.log;

function getVal(sel) {
    return $(sel).val();
}

// In cases which a language is equal to another we
// strongly prefer them in order passed.
//
// ex: py = 2, and ru = 2, then prefer Python
//     js = 2, and ru = 2, then prefer Ruby
function determinePreferredLanguage(py, ru, js) {
    if (py >= js && py >= ru) {
        return "Python";
    } else if (ru >= js && ru >= py) {
        return "Ruby";
    } else {
        return "JavaScript";
    }
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

        myLog(bdfl, typing, color, indentation, meal);

        // python, ruby, javascript
        let py = 0;
        let ru = 0;
        let js = 0;
        myLog(py, ru, js);

        [bdfl, typing, color, indentation, meal].forEach(function(item) {
            if (item === 'Python') {
                py += 1;
            } else if (item === 'Ruby') {
                ru += 1;
            } else {
                js += 1;
            }
        });

        let prefLanguage = determinePreferredLanguage(py, ru, js);

        $('div#output h2').html('<center>Thank you, '+ username +'. Your preferred language is: '+prefLanguage+'!</center>')
	});
});
