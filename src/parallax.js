const Parallax = {
  elements: null,
  init: function(elements) {
    this.elements = elements;
    this.setupElement();
  },
  getPosition: function(element) {
    var distance = 0;
    do {
      distance += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    distance = distance < 0 ? 0 : distance;
    return distance;
  },
  setPosition: function(element, getPosition) {
    let direction = element.getAttribute('direction');
    let scroll = direction === 'vertical' ? scrollY : scrollX;
    let strength = JSON.parse(element.getAttribute('strength'));
    let scale = JSON.parse(element.getAttribute('scale'));
    let top = getPosition(element);
    if (direction === 'vertical') {
      let height = (window.innerHeight - element.offsetHeight) / 2;
      let y = Math.round((top - height - scroll) * strength);
      element.style.transform = 'translate3d(0px,' + y + 'px, 0px) scale(' + scale + ')';
    }
  },
  setupElement: function() {
    let elements = this.elements;
    let setPosition = this.setPosition;
    let getPosition = this.getPosition;
    elements.forEach(function(element, index) { return setPosition(element, getPosition) })
    this.setupListeners();
  },
  setupListeners: function() {
    let elements = this.elements;
    let setPosition = this.setPosition;
    let getPosition = this.getPosition;
    window.addEventListener('scroll', function() {
      elements.forEach(function(element, index) { return setPosition(element, getPosition) })
    })
  }
};

window.addEventListener('DOMContentLoaded', function() {
  const parallaxElements = document.querySelectorAll("[effect='parallax']");
  if (parallaxElements.length) return Parallax.init(parallaxElements);
})