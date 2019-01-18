export function handleGameResize(width = this.sys.game.config.width, height = this.sys.game.config.height) {
  this.cameras.resize(width, height);
};

export function handleWindowResize() {
  window.addEventListener('resize', function() {
    window.game.resize(window.innerWidth, window.innerHeight);
  }, false);

  const container = document.querySelector('.game-container');
  container.addEventListener('click', makeFullScreen, false);
  document.addEventListener('keydown', makeFullScreen, false);

  function makeFullScreen() {
    if (document.webkitFullscreenElement === null ||
        document.mozFullscreenElement === null ||
        document.msFullscreenElement === null ||
        document.fullscreenElement === null ) {
      typeof container.webkitRequestFullScreen === "function" && container.webkitRequestFullScreen();
      typeof container.mozRequestFullScreen === "function" && container.mozRequestFullScreen();
      typeof container.msRequestFullscreen === "function" && container.msRequestFullscreen();
      typeof container.requestFullscreen === "function" && container.requestFullscreen();
    }
  }
};