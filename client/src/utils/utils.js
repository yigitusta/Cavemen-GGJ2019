
export function handleGameResize(width = this.sys.game.config.width, height = this.sys.game.config.height) {
  this.cameras.resize(width, height);
};

export function handleWindowResize() {
  window.addEventListener('resize', function() {
    window.game && window.game.resize(window.innerWidth, window.innerHeight);
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

export function sendWindowSize(callback) {
  const w = this.sys.game.config.width;
  const h = this.sys.game.config.height;

  callback({w, h});
}

export function getWASD(ctx) {
  const W = ctx.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  const A = ctx.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  const S = ctx.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  const D = ctx.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  return () => ({
    left: A.isDown,
    right: D.isDown,
    up: W.isDown,
    down: S.isDown
  });
}