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
  function displayLanguagePref(user, lang) {
    // this is definitely unsafe
    $('#username-out').html(`${user}`);
    $('#lang-out').html(`<span id='${lang}'>${lang}</span>`);

    $('form, div#output').toggle();
  }

  $('#hide-results').on('click', function () {
    $('form, div#output').toggle();
  });

  // This would be great to hide with a rot13
  function makeNameExtraFancy(name) {
    if (name.toUpperCase() === 'ERIK'
     || name.toUpperCase() === 'RYAN'
     || name.toUpperCase() === 'LOUIE'
     || name.toUpperCase() === 'WILL'
     || name.toUpperCase() === 'LEXIE') {
      return `<span id="fancy-name">${name}</span>`;
    } else {
      return `<span id="basic-name">${name}</span>`;
    }
  }

  $('form').submit(function(e) {
    e.preventDefault();

    let aprefLanguage = {
      'Python': 0,
      'Ruby': 0,
      'JavaScript': 0
    }

    $('fieldset[name=langpref] input:radio:checked, fieldset[name=langpref] select').each(function() {
      console.log(this.name, this.value);
      aprefLanguage[this.value] += 1;
    });

    console.log(aprefLanguage);

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
    username = makeNameExtraFancy(username);

    displayLanguagePref(username, prefLanguage);
    
    // Reset form inputs after we've determined which language is best
    // for user.
    $(this).trigger('reset');
  });
  // Reset on page refresh
  // XXX not sure if this is desired functionality
  $('form').trigger('reset');
});
