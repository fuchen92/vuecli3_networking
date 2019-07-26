import ToastComponent from "./Toast.vue";

const Toast = {
    install: function(Vue, options) {
        Vue.prototype.$toast = function(option) {
            option = option || {};
            if(typeof option === "string") {
                option = {
                    msg: option
                }
            }
            var ToastConstructor = Vue.extend(ToastComponent);
            var instance = new ToastConstructor({
                data: option
            });
            instance.$mount();
            document.body.appendChild(instance.$el);
            instance.show = true;
        }
    }
}

export default Toast;