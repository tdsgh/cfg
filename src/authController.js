//import Rx from 'rxjs/Rx';

class AuthController {
    constructor (props){
        this._authenticated = false;
        this._subject = props.subject;
        this._srvFetch = props.srvFetch;
    }

    get authenticated () {
        return this._authenticated;
    }

    authenticate() {
        var credentials = {username: "dima", password: "_Dima.t321"};

        return this._srvFetch.fetch({
            call: "login",
            data: credentials
        });
    }
}

export default AuthController;