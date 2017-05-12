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

    set logger (log){
        this._logger = log;
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

        const start = _.now();
        
        return fetch(url, {
            method: options.method || this.method,
            mode: "cors",
            body: formData
            //body: JSON.stringify(options.data)
        }).then(
            (response) => {
                const resp = _.now();
                return response.text().then((rStr) => ({respStr: rStr, start: start, respEnd: resp}));
            }
        ).then(
            (resp) => {
                const startParse = _.now();
                const ret = appUtil.cyclicParseJson(resp.respStr);
                const endParse = _.now();

                if(this._logger){
                    this._logger({
                        target: "fetch",
                        type: options.call,
                        value: `${resp.respEnd - resp.start}][${endParse - resp.respEnd}][${endParse - resp.start}`
                    });
                }

                return ret;
            }
        );
    }
}

const SrvFetch = new SrvFetchClass();

export default SrvFetch;