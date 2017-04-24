import 'whatwg-fetch';
import 'lodash';
import appUtil from './utils/appUtil'
import fetchConfig from './configs/fetch.json';

const apiResponseNotNumericFields = [
      "ean",
      "upc",
      "sku",
      "isbn_13",
      "isbn",
      "asin",
      "p_asin",
      "name",
      "product_code"
    ];
function isApiResponseFieldNumeric(field, value) {
    return _.indexOf(apiResponseNotNumericFields, field.toLowerCase()) === -1;
}

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
        }).then(
            (response) => response.text()
        ).then(
            (respStr) => appUtil.cyclicParseJson(respStr)
        );
    }
}

const SrvFetch = new SrvFetchClass();

export default SrvFetch;