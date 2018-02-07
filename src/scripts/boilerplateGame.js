import $ from "jquery";

// Constructor for JSBoilerplate. If you rename this, you need to rename it also in init.js
// Take options object as a parameters. Given options override defaults
function JSBoilerplate(options) {
  // Make this object visible in functions.
  const self = this;

  // Default values for options
  // These are defined pretty well in init.js. I'll save some space and leave this half empty.
  self.options = {
    parent: $("body"),
    url: "/",
    theme: "normal"
  };

  // Extend default options with given options
  // This uses jQuery ($)
  $.extend(self.options, options);

  // Make some options easier to access
  self.data = self.options.data;
  self.url = self.options.url;
  self.submit = self.options.submit;
  self.sendAnswer = self.options.sendAnswer;

  // Create a container for the game.
  // There needs to be a "gamearea"-container, which is positioned relative and takes the
  // full width and height of it's parent. Everything in the game must be placed inside "gamearea".
  // Note: self.options.parent is the most outer container
  // self.parent is the game itself and everything should be added there
  // USE self.parent TO ADD THINGS IN YOUR GAME!
  self.parent = $('<div class="gamearea"></div>');
  // Add the game to the outer element
  self.options.parent.append(self.parent);

  // Make the are fullscreen. Give some time to make sure
  // the parent is rendered before resizing
  setTimeout(function() {
    self.resize();
  }, 500);

  // Handle window resize
  window.onresize = self.resize.bind(self);

  // Check if game has been detached every 1000ms
  const detacherId = setInterval(function() {
    if ($(self.parent).parents("body").length === 0) {
      // Detach all key and mouse listeners here.
      // Aslo clear all intervals and timeouts
      clearInterval(detacherId);
    }
  }, 1000);

  // Draw start screen
  self.drawStartScreen();
}

//Starting point for the game
JSBoilerplate.prototype.start = function() {
  // eslint-disable-next-line no-unused-vars
  const self = this;

  // eslint-disable-next-line no-console
  console.log("the game has begun!");
};

// Draws the initial start screen, with a big start-button.
// Game starts only after user has decided to start the game.
// You can skip this, if you like.
JSBoilerplate.prototype.drawStartScreen = function() {
  const self = this;

  self.parent.append('<div class="startbutton">Start!</div>');
  $(".startbutton").click(function(e) {
    const elem = this;
    e.preventDefault();
    // disable keylistener
    $(document).off("keypress");

    // ugly hack to wait until the animation is completed.
    setTimeout(function() {
      // fade button, start game, remove button
      $(elem).fadeOut(function() {
        // focus parent div (needed, if you have keylistener in your game)
        self.parent.focus();
        // start the game
        self.start();
        // remove start-button
        $(elem).remove();
      });
    }, 200);
  });

  $(document).keypress(function(e) {
    if (e.which === 13 || e.keyCode === 13) {
      $(".startButton").click();
    }
  });
};

// Keep the game in fullscreen even on window resize
JSBoilerplate.prototype.resize = function() {
  const self = this;
  // First make sure that the outer most element is full width and height
  $(self.options.parent).width(
    parseFloat($(window).width()) -
      parseFloat($(self.options.parent).offset().left) +
      "px"
  );
  $(self.options.parent).height(
    parseFloat($(window).height()) -
      parseFloat($(self.options.parent).offset().top) +
      "px"
  );

  // Make sure that the game container fills the outer most container.
  $(self.parent).width($(self.options.parent).width());
  $(self.parent).height($(self.options.parent).height());
};

export default JSBoilerplate;
