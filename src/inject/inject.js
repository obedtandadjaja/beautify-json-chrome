var current_path = []
var current = document.body

function onlyReturningJSONData() {
  var body = document.body

  if (body.children.length > 1) return false
  return body.children[0].tagName == 'PRE'
}

function formatJSON(json) {
  current.innerHTML += '<div class="beautify-json">{<ul></ul>}</div>'
  current_path.push('.beautify-json')
  current_path.push('ul')
  updateCurrent()
  iterateObject(json)
}

function updateCurrent() {
  path = current_path.join(' > ')
  current = document.querySelector(path)
}

function iterateObject(object) {
  for(key in object) {
    var value = object[key]
    if(value == null) {
      addObjectField(null, key, value)
    } else if(value instanceof Array) {
      addArray(object)
      addArrayProperty(key)
      iterateArray(value)
      completeObject()
    } else if(typeof value == 'object') {
      addObject(object)
      addObjectProperty(key)
      iterateObject(value)
      completeObject()
    } else {
      addObjectField(typeof value, key, value)
    }
  }
}

function iterateArray(array) {
  for(var i = 0; i < array.length; i++) {
    value = array[i]
    if(value == null) {
      addArrayField(null, value)
    } else {
      addArrayField(typeof value, value)
    }
  }
}

function addObject(object) {
  current.innerHTML += '<li><div class="hoverable object"></div></li>'
  current_path.push('li:last-child')
  current_path.push('.object')
  updateCurrent()
}

function addArray(object) {
  current.innerHTML += '<li><div class="hoverable array"></div></li>'
  current_path.push('li:last-child')
  current_path.push('.array')
  updateCurrent()
}

function addObjectProperty(key) {
  current.innerHTML += '<span class="property">"' + key + '"</span>: {<span class="ellipsis"></span><div class="collapser"></div><ul class="collapsible"></ul>}'
  current_path.push('ul.collapsible')
  updateCurrent()
}

function addArrayProperty(key) {
  current.innerHTML += '<span class="property">"' + key + '"</span>: [<span class="ellipsis"></span><div class="collapser"></div><ul class="collapsible"></ul>]'
  current_path.push('ul.collapsible')
  updateCurrent()
}

function completeObject() {
  current_path.pop()
  current_path.pop()
  current_path.pop()
  updateCurrent()
}

function addObjectField(type, key, value) {
  current.innerHTML += '<li><div class="hoverable"><span class="property">"' + key + '"</span>: <span class="value type-' + type + '"></span></div></li>'
  current = current.querySelector('li:last-child > .hoverable > .value')
  if(type == 'string') {
    current.innerHTML += '"' + value + '"'
  } else {
    current.innerHTML += value
  }
  updateCurrent()
}

function addArrayField(type, value) {
  current.innerHTML += '<li><div class="hoverable"><span class="value type-' + type + '"></span></div></li>'
  current = current.querySelector('li:last-child > .hoverable > .value')
  if(type == 'string') {
    current.innerHTML += '"' + value + '"'
  } else {
    current.innerHTML += value
  }
  updateCurrent()
}

if(onlyReturningJSONData()) {
  var text = document.body.innerText
  var json = JSON.parse(text)

  document.body.innerHTML = ''
  formatted_json = formatJSON(json)

  hoverables = document.getElementsByClassName('hoverable')
  for(i = 0; i < hoverables.length; i++) {
    hoverable = hoverables[i]
    hoverable.addEventListener('mouseover', function(e) {
      e.stopPropagation()
      this.classList.add('hovered')
    }, false)
    hoverable.addEventListener('mouseout', function(e) {
      e.stopPropagation()
      this.classList.remove('hovered')
    }, false)
  }

  collapsers = document.getElementsByClassName('collapser')
  for(i = 0; i < collapsers.length; i++) {
    collapser = collapsers[i]
    collapser.addEventListener('click', function(e) {
      this.parentElement.classList.toggle('collapsed')
    });
  }
}
