
const appUtil = {
    cyclicParseJson: function(obj, isNumeric, field){
            if(!obj) return obj;
            
            try{
                while(typeof obj === 'string' &&
                      (['"', '{', '['].indexOf(obj.charAt(0)) >= 0 ||
                       //obj.charAt(0) == '"' ||
                       //obj.charAt(0) == '{' ||
                       //obj.charAt(0) == '[' ||
                       (obj.charAt(0) == '\\' && obj.charAt(1) == '"') ||
                       obj === 'true' || obj === 'false'
                      )
                      ) obj = JSON.parse(obj);
            }catch(e){return obj;}
            
            if(typeof obj === 'string'){
                if (!isNaN(obj) && isFinite(obj) &&
                    (!field || !isNumeric || isNumeric(field, obj))) {

                    return parseFloat(obj);
                } else {
                    return obj;
                }
            }
            
            if(typeof obj === 'number') return obj;
            
            if(obj instanceof Array){
                var arr = [];
                for(var i = 0; i < obj.length; i++){
                    arr.push(this.cyclicParseJson(obj[i], isNumeric));
                }
                return arr;
            }
            
            if(typeof obj === 'object'){
                var ret = {};
                for(var f in obj){
                    if(typeof obj[f] != 'function')
                        ret[f] = this.cyclicParseJson(obj[f], isNumeric, f);
                }
                return ret;
            }
            return obj;  
        }
};

export default appUtil;