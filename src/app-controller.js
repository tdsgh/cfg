import createHashHistory from 'history/createHashHistory';

import Rx from 'rxjs/Rx';

const history = createHashHistory();

class ApplicationController {
    constructor (){
        this._appReady = false;
        this._appSubject = new Rx.Subject();
        this._cnt = 1;

        this.timerID = setInterval(
            () => this.tick(),
            10000
        );

        this.unlisten = history.listen((location, action) => {
            console.log(action, location.pathname, location.state);
        })
    }

    authenticated = false;

    get appSubject (){
        return this._appSubject;
    }

    set appReady (isReady) {this._appReady = isReady;}

    tick() {
        this._appReady && history.location.pathname != '/settings' && history.push('/settings');
        this._appSubject.next(this._cnt++);
    }
}

const AppController = new ApplicationController();

export default AppController;