class Component {
   constructor(markup, name) {
      this.markup = markup;
      this.name = name;
      this.markup.setAttribute('data-init', true);
      this.enabled = true;
   }

   getName() {
      return this.name;
   }

   getMarkup() {
      return this.markup;
   }
}

class Button extends Component {
   constructor(markup, name, func) {
      super(markup, name);
      this.markup.addEventListener('click', func);
   }

   setCaption(caption) {
      this.markup.innerHTML = caption;
   }

   getCaption() {
      return this.markup.innerHTML;
   }

   isEnabled() {
      return this.markup.hasAttribute('disabled');
   }

   setEnabled(state) {
      if (state) {
         this.markup.removeAttribute('disabled');
      } else {
         this.markup.setAttribute('disabled', true);
      }
   }
}

class MenuButton extends Button {
   constructor(markup, name, func) {
      super(markup, name, func);
   }
}

class Popup extends Component {
   constructor(markup, name) {
      super(markup, name);
      this.caption = markup.querySelector('.popup-window__caption');
      this.info = markup.querySelector('.popup-window__info');
      this.markup.addEventListener('click', this.close);
   }

   open(caption, info) {
      caption && this.setCaption(caption);
      info && this.setInfo(info);
      this.markup.style.display = 'flex';
   }

   close() {
      if (event) {
         if (event.target == this) {
            this.style.display = 'none';
         }
      } else {
         this.markup.style.display = 'none'
      }
   }

   setCaption(caption) {
      this.caption.innerHTML = caption;
   }

   setInfo(info) {
      this.info.innerHTML = info;
   }

   getInfo() {
      return this.info.innerHTML;
   }

   getCaption() {
      return this.caption.innerHTML;
   }
}

class Input extends Component {
   getCaption() {
      return this.markup.innerText;
   }

   setCaption(caption) {
      this.markup.innerText = caption;
   }
}