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

let pressedKeys: string[] = [];
window.onkeydown = function (e) {
  if (pressedKeys.includes(e.code)) return;
  pressedKeys.push(e.code);
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
window.onkeyup = function (e) {
  pressedKeys = pressedKeys.filter((c) => c !== e.code);
};
window.player = player;

const instructionsDiv = document.querySelector('#instructions')!;
const closeInstructionsButton = instructionsDiv.querySelector('button')!;
closeInstructionsButton.addEventListener('click', () =>
  instructionsDiv.classList.add('closed')
);
