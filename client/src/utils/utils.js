
export function handleGameResize(width = this.sys.game.config.width, height = this.sys.game.config.height) {
  this.cameras.resize(width, height);
};

export function handleWindowResize() {
  window.addEventListener('resize', function() {
    window.game.resize(window.innerWidth, window.innerHeight);
  }, false);

  const container = document.querySelector('.game-container');
  // container.addEventListener('click', makeFullScreen, false);
  // document.addEventListener('keydown', makeFullScreen, false);

  function makeFullScreen(e) {
    if (e.keyCode === 122) return;
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

export function cursorToDir(cursors) {
  return {
    left: cursors.left.isDown,
    right: cursors.right.isDown,
    up: cursors.up.isDown,
    down: cursors.down.isDown
  };
}