(function(){'use strict';const Parallax = {
  elements: null,
  init: function(elements) {
    this.elements = elements;
    this.setPosition();
  },
  setPosition: function() {
    let elements = this.elements;
    elements.forEach(function(element, index) { 
      let position = [Math.round(element.offsetLeft), Math.round(element.offsetTop)];
      element.setAttribute('position', JSON.stringify(position));
      element.style.top = 0;
      element.style.left = 0;
      element.style.willChange = 'transform';
      element.style.transform = 'translate3d(' + position[0] + 'px, ' + position[1] + 'px, 0px)';
    });
    this.setupListeners();
  },
  setupListeners: function() {
    let elements = this.elements;
    window.addEventListener('scroll', function() {
      elements.forEach(function(element, index) {
        let scroll = element.getAttribute('scrollDirection') === 'vertical' ? scrollY : scrollX;
        let direction = element.getAttribute('parallaxDirection');
        let position = JSON.parse(element.getAttribute('position'));
        let strength = JSON.parse(element.getAttribute('strength'));
        switch(direction) {
          case '-x': {
            let x = (position[0] - (scroll * strength * 0.5));
            element.style.transform = 'translate3d(' + x + 'px, ' + position[1] + 'px, 0px)';
            break;
          }
          case 'x': {
            let x = (position[0] + (scroll * strength * 0.5));
            element.style.transform = 'translate3d(' + x + 'px, ' + position[1] + 'px, 0px)';
            break;
          }
          case '-y': {
            let y = (position[1] - (scroll * strength * 0.5));
            element.style.transform = 'translate3d(' + position[0] + 'px, ' + y + 'px, 0px)';
            break;
          }
          case 'y': {
            let y = (position[1] + (scroll * strength * 0.5));
            element.style.transform = 'translate3d(' + position[0] + 'px, ' + y + 'px, 0px)';
            break;
          }
        }
      });
    });
  }
};

window.addEventListener('DOMContentLoaded', function() {
  const parallaxElements = document.querySelectorAll("[effect='parallax']");
  if (parallaxElements.length) return Parallax.init(parallaxElements);
});}());