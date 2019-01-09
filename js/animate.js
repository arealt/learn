/**
 * Created by Administrator on 2018/11/28 0028.
 */
//封装的获取obj元素的attr属性值
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];   //ie opra
    }else{
        return window.getComputedStyle(obj,null)[attr];  //w3c浏览器
    }
}
//封装带回调的动画函数
function animate(obj,json,fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            var current = 0;
            if (attr == "opacity") {    //如果目标属性为透明度
                current = Math.round(parseInt(getStyle(obj,attr) * 100)) || 0;
            } else {
                current = parseInt(getStyle(obj, attr));
            }
            var step = (json[attr] - current) / 10;  //步长  目标先减现在 再除10
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (attr == "opacity") {
                if ("opacity" in obj.style) {     //判断浏览器是否支持opacity
                    obj.style.opacity = (current + step) / 100;
                } else {
                    obj.style.filter = "alpha(opacity=" + (current + step) * 10 + ")";
                }
            } else if (attr == "zIndex") {
                obj.style.zIndex = json[attr];
            } else {
                obj.style[attr] = current + step + "px";
            }
            if (current != json[attr]) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 60);
}