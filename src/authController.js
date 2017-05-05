import Rx from 'rxjs/Rx';

class AuthController {
    constructor(props) {
        this._authenticated = false;
        this._subject = props.subject;
        this._srvFetch = props.srvFetch;
    }

    get authenticated() {
        return this._authenticated;
    }

    authenticate() {
        var credentials = { username: "dima", password: "_Dima.t321" };

        var ret = new Rx.Subject();

        this._subject.next({ target: "dialog", type: "login", value: ret })

        return ret.single().toPromise().then((crd) => {
            this._srvFetch.fetch({
                call: "login",
                data: credentials
            });
        });
        // return this._srvFetch.fetch({
        //     call: "login",
        //     data: credentials
        // });
    }
}

export default AuthController;