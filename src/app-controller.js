import createHashHistory from 'history/createHashHistory';
import AuthController from './authController'

import Rx from 'rxjs/Rx';

const history = createHashHistory();

class ApplicationController {
    constructor (){
        this._appReady = false;
        this._appSubject = new Rx.Subject();
        this._cnt = 1;

        this._appSubject.subscribe({next: this.lifecycle});

        this.timerID = setInterval(
            () => this.tick(),
            10000
        );

        this.unlisten = history.listen((location, action) => {
            console.log(action, location.pathname, location.state);
        });

        this._authController = new AuthController({subject: this._appSubject});
    }

    authenticated = false;

    get appSubject (){
        return this._appSubject;
    }

    set appReady (isReady) {this._appReady = isReady;}

    tick() {
        //this._appReady && history.location.pathname != '/settings' && history.push('/settings');
        this._appSubject.next({target: "app", tick: this._cnt++});
    }

    lifecycle(params){
        console.log(JSON.stringify(params));
        if(params.target == "app" && params.type == "state"){
            if(params.value == "viewReady"){
                if(!this._authController.authenticated)
                    this._authController.authenticate();
            }
        }
    }
}

const AppController = new ApplicationController();

export default AppController;