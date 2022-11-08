<template>
    <!-- 消息列表 -->
    <transition name="slide-fade">
        <div class="message-container" v-show="visibled">
            <!-- 内容 -->
            <div class="message-content">

                <!-- 消息类型图标，通过消息类型确定，text类型不配置图标 -->
                <div class="message-icon" v-if="config.icon">
                    <i :class="config.icon"></i>
                </div>

                <!-- 消息文本 -->
                <span v-text="config.content"></span>

                <!-- 手动关闭消息 -->
                <div class="option" v-if="!config.close">
                    <i class="ri-close-fill" @click="onClose"></i>
                </div>

            </div>
        </div>
    </transition>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue';
const props = defineProps({
    config:{
        type: Object, // 消息配置项
        default: ()=>{}
    },
    remove:{
        type: Function, // 取消挂载回调
        default: ()=>{}
    }
})

const visibled = ref(false)


const onOpen = (config:any) => {
    setTimeout(()=>{
        visibled.value = true
    }, 30)

    // 指定时间后移除

    setTimeout(()=>{
        onClose();
    },config?.duration?? 3000)
}

onOpen(props.config)

const onClose = ()=>{
    visibled.value = false;
    setTimeout(()=>{
        props.remove();
    }, 200)
}
</script>


<style lang="less">
@import "./Message.less";
</style>