<template>
    <div class="me">
        <!-- <h1>This is an about page</h1> -->
		<div class="container">
			<div class="meCard">
				<router-link class="meInfoLink" to="/meinfomation">
					<div class="meAvatar">
						<img class="meAvatarImg" src="../assets/avatar.jpg" alt="">
					</div>
					<div class="meInfo">
						<p class="meName">宇智波 ● 鼬</p>
						<p class="meCompany">木叶暗部</p>
						<p class="meJob">暗部杀手</p>
					</div>
				</router-link>
				<div class="qrCode">
					<router-link class="qrCodeLink" to="/qrcode">
						<img class="qrCodeIcon" src="../assets/iconQrCode.svg" alt="">
						签到码
					</router-link>
				</div>
			</div>
			<div class="menuCard clear">
				<p class="menuLabel lt">语言选择</p>
				<select class="languageChoose rt">
					<option value="zh">中文</option>
					<option value="en">EN</option>
				</select>
			</div>
			<div class="menuCard">
				<router-link class="menuCardLink clear" to="/meneed">
					<p class="menuLabel lt">我的需求</p>
					<span class="menuCardLinkIcon rt">点击查看</span>
				</router-link>
			</div>
		</div>
    </div>
</template>
<script>
export default {
	name: "Me"
};
</script>
<style>
.me {
	padding: 1rem 0;
}
.me > .container {
	width: 90%;
}
.meCard {
	box-sizing: border-box;
	margin: 0.2rem 0;
	padding: 0.4rem 0.2rem;
	font-size: 0;
	background-color: #fff;
}
.meInfoLink, .qrCode {
	display: inline-block;
	vertical-align: middle;
	font-size: 0;
}
.meInfoLink {
	width: calc(100% - 1rem);
	color: #2c3e50;
}
.meAvatar, .meInfo {
	display: inline-block;
	vertical-align: top;
}
.meAvatar {
	width: 1.2rem;
	height: 1.2rem;
	margin-right: 0.2rem;
	border-radius: 100%;
	overflow: hidden;
}
.meAvatarImg {
	width: 100%;
}
.meInfo {
	box-sizing: border-box;
	width: calc(100% - 1.4rem);
	padding-right: 0.2rem;
	font-size: 0.28rem;
}
.meName, .meCompany, .meJob {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.meName {
	font-weight: bold;
}
.qrCode {
	width: 0.9rem;
	text-align: center;
}
.qrCodeLink {
	font-size: 0.28rem;
	color: #2c3e50;
}
.qrCodeIcon {
	width: 0.4rem;
	margin: 0 auto 0.1rem;
}
.menuCard {
	box-sizing: border-box;
	margin: 0.2rem 0;
	padding: 0.4rem 0.2rem;
	font-size: 0;
	background-color: #fff;
}
.menuLabel {
	font-size: 0.28rem;
	color: #2c3e50;
}
.languageChoose {
	padding-right: 0.4rem;
	font-size: 0.28rem;
	line-height: 0.4rem;
	border: 0;
	background: url(../assets/dropdown.png) right center/0.32rem auto no-repeat;
}
</style>
