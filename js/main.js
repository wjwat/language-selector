// In cases which a language is equal to another we
// strongly prefer them in order passed.
//
// ex: py = 2, and ru = 2, then prefer Python
//     js = 2, and ru = 2, then prefer JavaScript
function determinePreferredLanguage(lang) {
  return Array.from(lang.keys()).reduce(function(a, b) {
    return lang.get(a) >= lang.get(b) ? a : b;
  });
}

function getNameType(name) {
  specialNames = ['ERIK', 'RYAN', 'LOUIE', 'WILL', 'LEXIE']
  if (specialNames.includes(name.toUpperCase())) {
    return 'fancy-name';
  } else {
    return 'basic-name';
  }
}

function accumulate(myMap, value) {
  if(myMap.has(value)) {
    myMap.set(value, myMap.get(value) + 1);
  } else {
    myMap.set(value, 1);
  }
}

$(document).ready(function() {
  // display our language pref and hide the form
  function displayLanguagePref(user, nameType, lang) {
    // is this heinous? feels like it
    $('#username-out').text(function() {
      $(this).attr('class', nameType);
      return user;
    });

    // still feels heinous
    $('#lang-out').text(function() {
      $(this).attr('class', lang);
      return lang;
    });

    $('form, div#output').toggle();
  }

  // display our form after we've shown our language pref
  $('#hide-results').on('click', function () {
    $('form, div#output').toggle();
  });

  $('form').submit(function(e) {
    let prefLanguage = new Map();
    prefLanguage.set('Python', 1);

    $('fieldset[name=langpref] input:radio:checked, fieldset[name=langpref] select').each(function() {
      accumulate(prefLanguage, this.value);
    });

    // We strongly prefer Ruby & JavaScript for Epicodus students
    if ($('input:radio[name="epicodus"]:checked').val() === 'yes') {
      accumulate(prefLanguage, 'Ruby');
      accumulate(prefLanguage, 'JavaScript');
    } else {
      accumulate(prefLanguage, 'Python');
    }

    outName = $('input#username').val();
    nameType = getNameType(outName);

    displayLanguagePref(outName,
                        nameType,
                        determinePreferredLanguage(prefLanguage));
    
    // Reset form inputs after we've determined which language is best
    // for user.
    $(this).trigger('reset');
    e.preventDefault();
  });
});
