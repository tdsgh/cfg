import 'whatwg-fetch';
import fetchConfig from './configs/fetch.json';

class SrvFetchClass {
    constructor (){
        Object.assign(this, fetchConfig);
    }

    init(props){
        Object.assign(this, props);
    }

    set token (token) {
        this._token = token;
    }

    fetch(options) {
        var url = this.srvUrl + '/' + options.call;
        if(this.token)
            url += ('?' + this.token);

        var formData = new FormData();
        for(var f in options.data){
            formData.append(f, options.data[f]);
        }
        
        return fetch(url, {
            method: options.method || this.method,
            mode: "cors",
            body: formData
            //body: JSON.stringify(options.data)
        }).then(function(response){
            return response.text()
        });
    }
}

const SrvFetch = new SrvFetchClass();

export default SrvFetch;