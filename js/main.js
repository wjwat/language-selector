// In cases in which a language is scored equal
// to another we strongly prefer them in order passed.
function determinePreferredLanguage(lang) {
  return Array.from(lang.keys()).reduce(function(a, b) {
    return lang.get(a) >= lang.get(b) ? a : b;
  });
}

// Are we human or are we fancy?
function getNameType(name) {
  specialNames = ['ERIK', 'RYAN', 'LOUIE', 'WILL', 'LEXIE']
  if (specialNames.includes(name.toUpperCase())) {
    return 'fancy-name';
  } else {
    return 'basic-name';
  }
}


function accumulate(myMap, value) {
  if (myMap.has(value)) {
    myMap.set(value, myMap.get(value) + 1);
  } else {
    myMap.set(value, 1);
  }
}


function displayLanguagePref(user, nameType, lang) {
  $('#username-out').text(function() {
    $(this).attr('class', nameType);
    return user;
  });

  $('#lang-out').text(function() {
    $(this).attr('class', lang);
    return lang;
  });

  $('form, div#output').toggle();
}


$(document).ready(function() {
  $('#hide-results').on('click', function () {
    $('form, div#output').toggle();
  });

  $('form').submit(function(e) {
    let prefLanguage = new Map([
      ['Python', 1],
    ]);

    $('fieldset[name=langpref] input:radio:checked, fieldset[name=langpref] select').each(function() {
      accumulate(prefLanguage, this.value);
    });

    if ($('input:radio[name="epicodus"]:checked').val() === 'yes') {
      accumulate(prefLanguage, 'Ruby');
      accumulate(prefLanguage, 'JavaScript');
    } else {
      accumulate(prefLanguage, 'Python');
    }

    const outName = $('input#username').val();
    const nameType = getNameType(outName);

    displayLanguagePref(outName, nameType, determinePreferredLanguage(prefLanguage));
    
    $(this).trigger('reset');
    e.preventDefault();
  });
});
