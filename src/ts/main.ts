import { Camera } from './game/camera';
import { Game } from './game/game';
import { World } from './game/world';
import { randomNoise } from './random';

Camera.position.y = 35;

const game = new Game();
// game.addEntity(new Entity(Canvas.element.width / 2, Canvas.element.height / 2));

if (module.hot) {
  module.hot.accept(function () {
    location.reload();
  });
}

const speed = 0.5;
window.onkeydown = function (e) {
  switch (e.key) {
    case 'ArrowUp':
      Camera.position.y -= speed;
      break;
    case 'ArrowDown':
      Camera.position.y += speed;
      break;
    case 'ArrowRight':
      Camera.position.x += speed;
      break;
    case 'ArrowLeft':
      Camera.position.x -= speed;
      break;
  }
};

window.Camera = Camera;

window.onclick = function (e) {
  console.log(
    game.world.screenToWorldCoordinates(e.offsetX, e.offsetY),
    game.world.blockAtCoordinates(
      ...game.world.screenToWorldCoordinates(e.offsetX, e.offsetY)
    )
  );
};

window.noise = randomNoise;
