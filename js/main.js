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

// This would be great to hide with a rot13
function determineNameType(name) {
  if (name.toUpperCase() === 'ERIK'
    || name.toUpperCase() === 'RYAN'
    || name.toUpperCase() === 'LOUIE'
    || name.toUpperCase() === 'BROOKE'
    || name.toUpperCase() === 'CATHY'
    || name.toUpperCase() === 'JAMES'
    || name.toUpperCase() === 'PATRICK'
    || name.toUpperCase() === 'VERONICA'
    || name.toUpperCase() === 'WILL'
    || name.toUpperCase() === 'LEXIE') {
    return 'fancy-name';
  } else {
    return 'basic-name';
  }
}

function displayLanguagePref(user, nameType, lang) {
  $('#username-out').text(function() {
    $(this).attr('class', nameType);
    return user;
  });

  $('#lang-out').text(function() {
    $(this).attr('class', lang.toLowerCase());
    return lang;
  });

  $('form, div#output').toggle();
}

$(document).ready(function() {
  $('#hide-results').on('click', function() {
    $('form, div#output').toggle();
  });

  $('form').submit(function(e) {
    e.preventDefault();
    let username = getVal('input#username');
    let epicodus = getVal('input:radio[name="epicodus"]:checked');
    let bdfl = getVal('input:radio[name="bdfl"]:checked');
    let typing = getVal('input:radio[name="typing"]:checked');
    let color = getVal('select#colors option:selected');
    let indentation = getVal('select#indentation option:selected');
    let meal = getVal('select#meal option:selected');

    // python, ruby, javascript
    let py = 0;
    let ru = 0;
    let js = 0;

    // We strongly prefer Ruby & JavaScript for Epicodus students
    if (epicodus === 'yes') {
      js += 1;
      ru += 1;
    } else {
      py += 1;
    }

    // We are making the same decision for each of these variables so it's
    // easier to just iterate over them and accumulate the answers. The
    // other option would be some hairy looking if/if else/else nest.
    // Easiest would be using an object and map :)
    //
    // Why strings and not integer values? Because it's much easier to understand
    // what we're doing when it's just an accumulation of values keyed to strings,
    // and easier to extend as we write questions to be accumulated if their value
    // just has to match the text name of our options ('Python', 'Ruby', 'JavaScript').
    // See the refactor branch for a streamlined version of this.
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

    displayLanguagePref(username, determineNameType(username), prefLanguage);
    
    // Reset form inputs after we've determined which language is best
    // for user.
    $(this).trigger('reset');
  });
});
