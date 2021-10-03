Crafty.c("LevelController", {
    init: function () {
        this.addComponent("Persist, 2D, DOM");
        this.level = 0;
        this.totalLevels = 5;
        this.nextLevelLoading = false;

        this.bind("SetLevel", (level) => {
            this.level = level - 1;
            this.startLoading();
            setTimeout(this.changeLevel, 500);
        });

        this.bind("NextLevel", () => {
            if (this.canChangeLevel()) {
                this.startLoading();
                setTimeout(this.loadNextLevel, 500);
            }
        });

        this.bind("ResetLevel", () => {
            if (!this.nextLevelLoading) {
                this.startLoading();
                setTimeout(this.resetLevel, 500);
            }
        });

        this.startLoading = () => {
            this.nextLevelLoading = true;
        };

        this.canChangeLevel = () => {
            return !this.nextLevelLoading && this.level <= this.totalLevels;
        };

        this.loadNextLevel = () => {
            this.level++;
            Crafty.scene(`Level${this.level}`);
            this.nextLevelLoading = false;
        };

        this.resetLevel = () => {
            Crafty.scene(`Level${this.level}`);
            this.nextLevelLoading = false;
        };
    }
});