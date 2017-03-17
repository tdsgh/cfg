

class ApplicationController {
    constructor (){
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    authenticated = false;

    set funCb (cb) {this._funCb = cb;}

    tick() {
        this._funCb && this._funCb('/settings');
    }
}

const AppController = new ApplicationController();

export default AppController;