var stack = []
var result = ''

function onlyReturningJSONData() {
  var body = document.body

  if (body.children.length > 1) return false
  return body.children[0].tagName == 'PRE'
}

function formatJSON(json) {
  result += '<div id="formatted_json">{'
  iterateObject(json)
  result += '}</div>'
}

function iterateObject(object) {
  result += '<li><div class="hoverable">';

  for(key in object) {
    var value = object[key]
    if(value == null) {
      addObjectField(null, key, value)
    } else if(value instanceof Array) {
      iterateArray(value)
    } else if(typeof value == 'object') {
      result += '<span class="property">' + key + '</span>: {'
      iterateObject(value)
      result += '}</div></li>'
    } else {
      addObjectField(typeof value, key, value)
    }
  }

  result += '</li></div></ul>'
}

function iterateArray(array) {
  for(key in array) {

  }
}

function addObjectField(type, key, value) {
  result += '<li><div class="hoverable"><span class="property">' + key + '</span>: <span class="type-' + type + '">' + value + '</span></div></li>'
}

function addArrayField(type, key, value) {
}

if(onlyReturningJSONData()) {
  var text = document.body.innerText
  var json = JSON.parse(text)

  formatted_json = formatJSON(json)
  document.body.innerHTML = result
  // console.log(json)
}
