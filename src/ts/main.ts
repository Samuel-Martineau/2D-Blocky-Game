import playerSprite from '../images/player.png';
import { Entity } from './game/entity';
import { Game } from './game/game';
import { Vector } from './utils/vector';

// Initialisation du jeu
const game = new Game();
const player = new Entity(game, 50, 70, 1.5, 3, playerSprite);
game.camera.track(player);
game.start();

// Interactivité des instructions
const instructionsDiv = document.querySelector('#instructions')!;

const closeInstructionsButton = instructionsDiv.querySelector(
  'button'
) as HTMLButtonElement;
closeInstructionsButton.addEventListener('click', () => {
  instructionsDiv.classList.add('closed');
  openInstructionsButton.classList.remove('hidden');
});

const openInstructionsButton = document.querySelector(
  '#open-instructions'
) as HTMLButtonElement;
openInstructionsButton.addEventListener('click', () => {
  openInstructionsButton.classList.add('hidden');
  instructionsDiv.classList.remove('closed');
});

const frictionCheckbox = instructionsDiv.querySelector(
  '#friction'
) as HTMLInputElement;
frictionCheckbox.addEventListener(
  'change',
  () => (game.frictionEnabled = frictionCheckbox.checked)
);
const gravityCheckbox = instructionsDiv.querySelector(
  '#gravity'
) as HTMLInputElement;
gravityCheckbox.addEventListener(
  'change',
  () => (game.gravityEnabled = gravityCheckbox.checked)
);

// Contrôle du joueur
let pressedKeys: string[] = [];
window.onkeydown = function (e) {
  e.preventDefault();
  if (pressedKeys.includes(e.code)) return;
  pressedKeys.push(e.code);
  switch (e.code) {
    case 'Space':
      if (player.onGround || !game.gravityEnabled)
        player.applyForce(new Vector(0, 1));
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

// Parcel
if (module.hot) {
  module.hot.accept(function () {
    location.reload();
  });
}
