

<template>

<div>
</div>

</template>

<script>

let IPnow = window.localStorage.getItem('IPnow');
if(IPnow === null) {
    IPnow = 'http://api.thebesser.com';
}

const socketSrc = IPnow + ':17106';
const httpSrc = IPnow + ':17108/';

// const socketSrc = 'http://api.thebesser.com:17106';
// const httpSrc = 'http://api.thebesser.com:17108/';

const limitSec = 5;
const visionNow = '0.0.1';
export default {
    socketSrc, //长连接地址
    httpSrc, //http地址
    limitSec, //任务限制时间，秒
    visionNow, //版本号
}

</script>
