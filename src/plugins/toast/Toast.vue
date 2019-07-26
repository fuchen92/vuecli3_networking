<template>
    <transition name="fade" @after-leave="afterLeave">
        <div class="toast" v-show="show">
            {{ msg }}
        </div>
    </transition>
</template>
<script>
export default {
    data: function() {
        return {
            show: false,
            timer: null,
            duration: 1500,
            msg: ""
        }
    },
    methods: {
        afterLeave: function() {
            this.$destroy()
            this.$el.parentNode.removeChild(this.$el);
        },
        close: function() {
            this.timer = setTimeout(() => {
                if(this.show) {
                    this.show = false;
                }
            }, this.duration)
        }
    },
    mounted: function() {
        this.close();
    },
    beforeDestroy: function() {        
        this.timer = null;
    },
    destroyed: function() {
        
    }
}
</script>
<style>
.toast {
    position: fixed;
    width: auto;    
    max-width: 90%;
    padding: 0 0.2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);    
    font-size: 0.28rem;
    line-height: 0.6rem;
    border-radius: 0.1rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
}
.fade-enter-active, .fade-leave-active {
    transition: 0.2s ease-out;
}
.fade-enter {
    opacity: 0;
}
.fade-leave-active {
    opacity: 0;
}
</style>
