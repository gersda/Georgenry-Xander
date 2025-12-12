import { Level1 } from "./level1";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#202020",
  scene: [Level1],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

new Phaser.Game(config);
