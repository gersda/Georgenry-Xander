import Phaser from "phaser";

export class BaseScene extends Phaser.Scene {
  create() {
    // F3 toggle for physics debug
    this.input.keyboard.on('keydown-F3', (event) => {
        console.log("f3 pressed")
    if (event.altKey)
        console.log("f3 + alt pressed")
        this.physics.world.drawDebug = !this.physics.world.drawDebug;
        this.physics.world.debugGraphic.clear();
    });
  }
}