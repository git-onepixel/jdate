/**
 * @author onepixel.top
 * @date 2015-12-05
 *
 */
(function(){
    var jDate = function(dateString){

        return new jDate.fn.init(dateString);
    };

    jDate.fn = jDate.prototype = {
        length:0,
        getDay:function(){
            return this[0].getDay();
        },
        getYear:function(){
            return this[0].getFullYear();
        },
        getMonth:function(){
            return this[0].getMonth()+1;
        },
        getDate:function(){
            return this[0].getDate();
        },
        getHours:function(){
            return this[0].getHours();
        },
        getMinutes:function(){
            return this[0].getMinutes();
        },
        getSeconds:function(){
            return this[0].getSeconds();
        },
        getDateString:function(format){
            var date = this[0];

            if (!format){
                return date.toLocaleDateString();
            }
            var temp = {
                "M+" : date.getMonth()+1,
                "d+" : date.getDate(),
                "h+" : date.getHours(),
                "m+" : date.getMinutes(),
                "s+" : date.getSeconds()
            };

            if(/(y+)/.test(format)){
                format = format.replace(
                    RegExp.$1,
                    (this.getYear()+"").substr(4 - RegExp.$1.length));
            }
            for(var i in temp) {
                if(new RegExp("("+ i +")").test(format)){
                    format = format.replace(
                        RegExp.$1,
                        RegExp.$1.length == 1 ?
                        temp[i] : ("00"+ temp[i]).substr((""+ temp[i]).length)
                    );
                }
            }
            return format;
        },
        getTotalMills:function(){
            return this[0].getTime();
        },
        splice:[].splice
    };

    var init = jDate.fn.init = function(dateString){
        var exp = /^(\d+)(-|\/)(\d{1,2})(-|\/)(\d{1,2})(\s(\d{1,2}):(\d{1,2}):(\d{1,2})|)$/;
        if ( !dateString ){
            this[ 0 ] = new Date();
            this.length = 1;
        }else if (!exp.test(dateString)){
            throw new Error("Invalid Date Format!");
        }else {
            var dt = dateString.split(/\s/);
            dt.length == 1?dt.push("0:0:0"):{};
            var d = dt[0].split(/-|\//);
            var t = dt[1].split(':');
            this[ 0 ] = new Date(
                parseInt(d[0]),
                parseInt(d[1]) - 1,
                parseInt(d[2]),
                parseInt(t[0]),
                parseInt(t[1]),
                parseInt(t[2])
            );
            this.length = 1;
        }
    };
    init.prototype = jDate.fn;

    window.jDate = jDate;
})();
