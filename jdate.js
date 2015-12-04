(function(){
    var jDate = function(dateString){

        return new jDate.fn.init(dateString);
    };

    jDate.fn = jDate.prototype = {
        getDay:function(){
            return this.now.getDay();
        },
        getYear:function(){
            return this.now.getFullYear();
        },
        getMonth:function(){
            return this.now.getMonth()+1;
        },
        getDate:function(){
            return this.now.getDate();
        },
        getHours:function(){
            return this.now.getHours();
        },
        getMinutes:function(){
            return this.now.getMinutes();
        },
        getSeconds:function(){
            return this.now.getSeconds();
        },
        getDateString:function(format){
            if (!format){
                return this.now.toLocaleDateString();
            }
            var o = {
                "M+" : this.now.getMonth()+1,
                "d+" : this.now.getDate(),
                "h+" : this.now.getHours(),
                "m+" : this.now.getMinutes(),
                "s+" : this.now.getSeconds()
            };
            if(/(y+)/.test(format)){
                format=format.replace(RegExp.$1, (this.now.getFullYear()+"").substr(4 - RegExp.$1.length));
            }
            for(var k in o) {
                if(new RegExp("("+ k +")").test(format)){
                    format = format.replace(RegExp.$1, (RegExp.$1.length==1) ?
                        (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                }
            }
            return format;
        },
        getTotalMills:function(){
            return this.now.getTime();
        }
    };

    var init = jDate.fn.init = function(dateString){
        var exp = /^(\d+)(-|\/)(\d{1,2})(-|\/)(\d{1,2})(\s(\d{1,2}):(\d{1,2}):(\d{1,2})|)$/;
        if ( !dateString ){
            this.now = new Date();
        }else if (!exp.test(dateString)){
            throw new Error("Invalid Date Format!");
        }else {
            var dt = dateString.split(/\s/);
            dt.length == 1?dt.push("0:0:0"):{};
            var d = dt[0].split(/-|\//);
            var t = dt[1].split(':');
            this.now = new Date(
                parseInt(d[0]),
                parseInt(d[1]) - 1,
                parseInt(d[2]),
                parseInt(t[0]),
                parseInt(t[1]),
                parseInt(t[2])
            );
        }
    };
    init.prototype = jDate.fn;

    window.jDate = jDate;
})();
