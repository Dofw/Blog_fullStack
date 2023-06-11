export const code = `
 <template>
   <div :style="{ width: swiperWidth }">
     <!-- title -->
     <slot name="slideHeader"></slot>
     <!-- swiper -->
     <swiper
       :style="{ height: swiperHeight }"
       v-bind="{ ...defaultOptions, ...options }"
       @swiper="onSwiper"
       @slideChange="onSlideChange"
       @mouseenter="mouseenter"
       @mouseleave="mouseleave"
     >
       <swiper-slide v-for="(item, index) in data" :key="index">
         <slot name="slideContent" :item="item" :index="index"></slot>
       </swiper-slide>
     </swiper>
   </div>
 </template>
 
 <script setup>
 import { Autoplay } from "swiper";
 import { Swiper, SwiperSlide } from "swiper/vue";
 import "swiper/css";
 import "swiper/css/autoplay";
 import "swiper/css/virtual";
 import { defineProps, ref } from "vue";
 
 defineProps({
   //宽度
   swiperWidth: {
     type: String,
     default: "100%",
   },
   //高度: 设置在swiper组件中
   swiperHeight: {
     type: String,
     default: "350px",
   },
   //options
   options: {
     type: Object,
     default: () => {
       return {};
     },
   },
   //数据
   data: {
     type: Array,
     default: () => {
       return [];
     },
   },
 });
 
 // init options
 const defaultOptions = {
   direction: "vertical",
   modules: [Autoplay],
   slidesPerGroup: 2,
   loopFillGroupWithBlank: true,
   slidesPerView: 8,
   // spaceBetween: 10,
   speed: 300,
   effect: "fade",
   // autoplay: true,
   autoplay: {
     delay: 1500,
   },
   loop: false,
 };
 
 //初始Instance，swiper组件内部触发
 const swiperInstance = ref(null);
 const onSwiper = (swiper) => {
   swiperInstance.value = swiper;
 };
 
 // autoplay controller
 const mouseenter = () => {
   swiperInstance.value.autoplay.pause();
 };
 const mouseleave = () => {
   swiperInstance.value.autoplay.run();
 };
 
 // on every change
 const onSlideChange = () => {};
 </script>
 
 <style lang="scss" scoped></style>

`
