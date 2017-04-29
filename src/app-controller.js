import createHashHistory from 'history/createHashHistory';
import AuthController from './authController';
import SrvFetch from './srvFetch';

import Rx from 'rxjs/Rx';

const history = createHashHistory();

class ApplicationController {
    constructor (){
        this._appReady = false;
        this._appSubject = new Rx.Subject();
        this._cnt = 1;

        //this.lifecycle = this.lifecycle.bind(this);

        this._appSubject.filter((e) => (e.target == "app" && e.type == "state")).subscribe({next: this.lifecycle.bind(this)});

        this.timerID = setInterval(
            () => this.tick(),
            10000
        );

        this.unlisten = history.listen((location, action) => {
            console.log(action, location.pathname, location.state);
            this._appSubject.next({target: "app", type: "transition", value: location.pathname});
        });

        this._authController = new AuthController({subject: this._appSubject, srvFetch: SrvFetch});
    }

    authenticated = false;

    get appSubject (){
        return this._appSubject;
    }

    set appReady (isReady) {this._appReady = isReady;}

    tick() {
        //this._appReady && history.location.pathname != '/settings' && history.push('/settings');
        this._appSubject.next({target: "app", type: "tick", value: this._cnt++});
    }

    lifecycle(params){
        console.log(JSON.stringify(params));
        if(params.value == "viewReady"){
            if(!this._authController.authenticated)
                this._authController.authenticate().then(function(resp){
                    console.log(JSON.stringify(resp));
                });
        }
    }
}

const AppController = new ApplicationController();

export default AppController;