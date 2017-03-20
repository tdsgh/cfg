import createHashHistory from 'history/createHashHistory'

const history = createHashHistory();

class ApplicationController {
    constructor (){
        this._appReady = false;

        this.timerID = setInterval(
            () => this.tick(),
            10000
        );

        this.unlisten = history.listen((location, action) => {
            console.log(action, location.pathname, location.state);
        })
    }

    authenticated = false;

    set appReady (isReady) {this._appReady = isReady;}

    tick() {
        this._appReady && history.location.pathname != '/settings' && history.push('/settings');
    }
}

const AppController = new ApplicationController();

export default AppController;