<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
        </div> -->
		<router-view></router-view>
    </div>
</template>

<style>
:root {
	--themeColor: #c30d23;
}
html, body, header, section, aside, footer, div, p, h1, h2, h3, h4, h5, h6, ul, ol, li, dl, dt, dd {
    margin: 0;
    padding: 0;
}
html, body {
    width: 100%;
    height: 100%;
    /* font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif; */
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
a {
    display: block;
    text-decoration: none;
}
img {
    display: block;
    border: 0;
    outline: none;
}
ul, ol, li {
    list-style: none;
}
input, button, textarea, select {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
}
input, select, textarea {
    border: 1px solid #BFBFBF;
}
select::-ms-expand {
    display: none;
}
input:disabled, select:disabled, button:disabled {
    background: #999;
    cursor: not-allowed;
}
.container {
    margin: 0 auto;
    overflow: hidden;
}
.lt {
    float: left;
}
.rt {
    float: right;
}
.clear::after {
    display: block;
    content: "";
    clear: both;
}
.formGroup {
	min-height: 0.3rem;
	margin-bottom: 0.3rem;
	font-size: 0;
}
.formInput {
	width: 100%;
	height: 0.8rem;
	padding: 0 0.2rem;
}
.formTips {
	font-size: 0.24rem;
	line-height: 0.3rem;
	text-align: left;
	color: var(--themeColor);
}
.btn {
	width: 100%;
	height: 0.8rem;
	font-size: 0.28rem;
	text-align: center;
	cursor: pointer;
}
.btnRed {
	background-color: var(--themeColor);
	color: #fff;
}
#app {
    width: 100%;
    height: 100%;
    background-color: #F8F8F8;
    color: #2c3e50;
}
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
