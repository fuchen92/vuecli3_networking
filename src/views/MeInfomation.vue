<template>
    <div class="meInfomation">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="infomationWrapper">
            <div class="infomationCard">
                <div class="infomationAvatar">                
                    <img class="avatarPhoto" :src="myInfo.Photo || '../assets/avatar.jpg'" alt="">
                </div>
                <div class="infomationCardContent">
                    <label class="uploadLabel">
                        <input class="uploadInput" type="file" ref="uploadInput" accept="image/jpg, image/jpeg, image/png, image/gif" @change="uploadAvatar">
                        <i class="uploadBtn">{{ $t("meinfomation.upload") }}</i>
                    </label>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.name") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.Name }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.nameEn") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.NameEn }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.company") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.Company }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.companyEn") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.CompanyEn }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.job") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.JobTitle }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.jobEn") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.JobTitleEn }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.mobile") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.Mobile }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.email") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.Mail }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.wechat") }}</p>
                        <input class="wechatInput" type="text" v-model.trim="wechat" :placeholder="$t('meinfomation.wechatplaceholder')">
                    </div>
                </div>
            </div>
            <div class="infomationCard">
                <textarea class="infomationIntro" :placeholder="$t('meinfomation.intro')" v-model.trim="intro"></textarea>
            </div>
            <button class="saveInfomation" @click="saveInfomation" :disabled="isSaved">
                {{ $t("meinfomation.save['" + saveBtnIndex + "']") }}
            </button>        
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import NavBar from "@/components/NavBar";
export default {
    name: "MeInfomation",
    data: function() {
        return {
            // wechat: "111",
            // intro: "" 
            saveBtnIndex: 0,
            isSaved: false       
        }
    },
    components: {
        NavBar
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].meinfomation.navBarTitle
        },
        intro: {
            get() {
                return this.$store.state.MyInfomation.Intro
            },
            set(value) {
                this.$store.commit("CHANGEINTRO", value)
            }
        },
        wechat: {
            get() {
                return this.$store.state.MyInfomation.WeChat
            },
            set(value) {
                this.$store.commit("CHANGEWECHAT", value)
            }
        },
        ...mapState({
            apiDomain: state => state.ApiDomain,
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            myInfo: state => state.MyInfomation,
            contactList: state => state.MyInfomation.ContactList
		})
    },
    methods: {
        ...mapMutations([
            "CHANGEAVATAR"
        ]),
        uploadAvatar: function() {
            var reader = new FileReader(),
                img = new Image();                
            var fileData = this.$refs.uploadInput.files[0];
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");

            var formData = new FormData();
            formData.append('file', fileData);
            formData.append('token', this.token);
            formData.append('lang', this.lang == "zh" ? 1 : 2);

            this.$http.post(`http://files.traveldaily.cn/UploadSocial/UserPhoto`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res.data)
                this.CHANGEAVATAR(res.data.Message);
            })

            // if(file.type.indexOf("image") == 0) {
            //     reader.readAsDataURL(file)
            // }
            // reader.onload = function(e) {
            //     console.log("reader.onload执行")
            //     img.src = e.target.result;
            // }
            // img.onload = function() {
            //     console.log("img.onload执行")
            //     console.log(this)
            //     // 图片原始尺寸
            //     var originWidth = this.width;
            //     var originHeight = this.height;
            //     // 最大尺寸限制
            //     var maxWidth = 400, maxHeight = 400;
            //     // 目标尺寸
            //     var targetWidth = originWidth, targetHeight = originHeight;
            //     // 图片尺寸超过400x400的限制
            //     if (originWidth > maxWidth || originHeight > maxHeight) {
            //         if (originWidth / originHeight > maxWidth / maxHeight) {
            //             // 更宽，按照宽度限定尺寸
            //             targetWidth = maxWidth;
            //             targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            //         } else {
            //             targetHeight = maxHeight;
            //             targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            //         }
            //     }

            //     // canvas对图片进行缩放
            //     canvas.width = targetWidth;
            //     canvas.height = targetHeight;
            //     // 清除画布
            //     context.clearRect(0, 0, targetWidth, targetHeight);
            //     // 图片压缩
            //     context.drawImage(img, 0, 0, targetWidth, targetHeight);
            //     // canvas转为blob并上传
            //     console.log(canvas.toDataURL("jpeg"))
            // }


        },
        saveInfomation: function() {
            if((this.intro == "" || this.intro.length == 0) && (this.wechat == "" || this.wechat.length == 0)) {
                return false;
            }
            this.isSaved = true;
            let contactList = this.contactList;
            contactList.map(item => {
                if(item.Id == 3) {
                    item.Name = this.wechat
                }
            });
            // 不用触发action修改state
            // this.saveMyInfo({ intro: this.intro, contactList, token: this.token, lang: this.lang == "zh" ? 1 : 2 });
            this.$http.post(`${this.apiDomain}/Me/MeSave`, {
                Intro: this.intro,
                ContactList: contactList,
                token: this.token,
                lang: this.lang == "zh" ? 1 : 2
            }).then(res => {
                if(res.data.Code == 0) {
                    // alert("修改成功");
                    this.saveBtnIndex = 1;
                } else {
                    this.saveBtnIndex = 0;
                    this.isSaved = false;
                    alert(res.data.Message)
                }
            }).catch(err => {
                this.saveBtnIndex = 0;
                this.isSaved = false;
                alert(err);
            })
        },
        // 此处不用修改state
        // ...mapActions({
        //     saveMyInfo: "saveMyInfo"
        // })
	},
}
</script>
<style scoped>
.meInfomation {
    position: relative;
    width: 100%;
    height: 100%;
}
.infomationWrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.infomationCard {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto 0.2rem;
    padding: 0.4rem 0.2rem 0.2rem;
    background-color: #ffffff;
}
.infomationCard:first-child {
    margin-top: 1.15rem;
}
.infomationAvatar {
    position: relative;
    top: -1rem;
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 auto;
    border-radius: 100%;
    overflow: hidden;
}
.avatarPhoto {
    width: 100%;
}
.infomationCardContent {
    margin-top: -1rem;
    font-size: 0;
}
.uploadLabel {
    display: block;
    width: 100%;
    margin: 0.2rem auto 0.3rem;
    font-size: 0;
    text-align: center;
}
.uploadInput {
    display: none;
}
.uploadBtn {
    display: inline-block;
    width: 1.6rem;
    height: 0.6rem;
    border-radius: 0.4rem;
    font-size: 0.24rem;
    font-style: normal;
    line-height: 0.6rem;
    background-color: var(--themeColor);
    color: #ffffff;
}
.infomationItem:not(:last-child) {
    border-bottom: 1px solid #F0F1F2;
}
.infomationItemLabel, .infomationItemValue, .wechatInput {
    width: 3rem;
    font-size: 0.28rem;
    line-height: 0.8rem;
}
.infomationItemValue {
    width: calc(100% - 3rem);
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.wechatInput {
    width: calc(100% - 3rem);
    border: 0;
    text-align: right;
}
.infomationIntro {
    width: 100%;
    height: 1rem;
    resize: none;
    border: 0;
}
.saveInfomation {
    display: block;
    width: 95%;
    height: 0.8rem;
    margin: 0 auto;
    font-size: 0.28rem;
    line-height: 0.8rem;
    text-align: center;
    background-color: var(--themeColor);
    color: #fff;
}
</style>


