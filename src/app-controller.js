import createHashHistory from 'history/createHashHistory';
import AuthController from './authController';
import SrvFetch from './srvFetch';

import Rx from 'rxjs/Rx';

const history = createHashHistory();
const l10nEN = new Intl.DateTimeFormat("en-US")

class ApplicationController {
    constructor (){
        this._appReady = false;
        this._appSubject = new Rx.Subject();
        this._cnt = 1;

        SrvFetch.logging = this.logging;

        this._appSubject.subscribe(this.logging);
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

    get appSubject (){
        return this._appSubject;
    }

    tick() {
        this._appSubject.next({target: "app", type: "tick", value: this._cnt++});
    }

    lifecycle(params){
        if(params.value == "viewReady"){
            if(!this._authController.authenticated)
                this._authController.authenticate().then(function(resp){
                    console.log(JSON.stringify(resp));
                });
        }
    }

    logging(e){
        const time = l10nEN.format(new Date());
        console.log(`${time}: ${e.target} ${e.type} [${e.value}]`);
    }
}

const AppController = new ApplicationController();

export default AppController;