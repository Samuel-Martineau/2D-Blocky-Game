import playerSprite from '../images/player.png';
import { Entity } from './game/entity';
import { Game } from './game/game';
import { Vector } from './utils/vector';

const game = new Game();
const player = new Entity(game, 50, 70, 1.5, 3, playerSprite);
game.camera.track(player);
game.start();

if (module.hot) {
  module.hot.accept(function () {
    location.reload();
  });
}

window.onkeydown = function (e) {
  switch (e.code) {
    case 'Space':
      if (player.onGround) player.applyForce(new Vector(0, 1));
      break;
    case 'KeyA':
      player.applyForce(new Vector(-1, 0));
      break;
    case 'KeyD':
      player.applyForce(new Vector(1, 0));
      break;
  }
};

window.onclick = function (e) {
  console.log(
    game.world.screenToWorldCoordinates(e.offsetX, e.offsetY),
    game.world.blockAtCoordinates(
      ...game.world.screenToWorldCoordinates(e.offsetX, e.offsetY)
    ).type.name
  );
};
