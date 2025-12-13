import Phaser from "phaser";
import { Level1 } from "./level1";


const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#202020",
  
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
  scene: [Level1],
};

new Phaser.Game(config);
