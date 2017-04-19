//import Rx from 'rxjs/Rx';

class AuthController {
    constructor (props){
        this._authenticated = false;
        this._subject = props.subject;

    }

    get authenticated () {
        return this._authenticated;
    }

    authenticate() {

    }
}

export default AuthController;