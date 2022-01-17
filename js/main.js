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


function increment(myMap, value) {
  myMap.set(value, (myMap.has(value) ? myMap.get(value) + 1 : 1))
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

    $('input:radio:checked, select').each(function() {
      this.value.split(';').forEach(element => {
        increment(prefLanguage, element)
      })
    });

    console.log(prefLanguage)

    const outName = $('input#username').val();
    const nameType = getNameType(outName);

    displayLanguagePref(outName, nameType, determinePreferredLanguage(prefLanguage));

    $(this).trigger('reset');
    e.preventDefault();
  });
});
