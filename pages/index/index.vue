<template>
	<view class='page'>
		<!--设置名称-->
		<view class="topInput">
			<input class='inputname' v-model='name' placeholder='Your Name'/>
			<button class='submitName' @click="onSubmitName">Confirm</button>
		</view>
	
		
		<!--显示消息-->
		<view class='messages'>
			<!--遍历每一条消息-->
			<view class='content' v-for="(item, index) in list" :key='index'>
				<text class='name'>{{item.name}}</text>
				<text class='msg'>{{item.msg}}</text>
			</view>
		</view>
		
		<!--输入框和发送按钮-->
		<view class='send'>
			<input class='input' placeholder="Your Message" v-model="content" />
			<button class='submit' @click="sendMsg()">Send</button>
		</view>

	</view>
</template>

<script>
	export default {
		/*进入程序时的初始数据*/
		data() {
			return {
				name: '',
				list: [{
					"name": 'USER',
					"msg": "Message"

				}],
				content: ''
			}
		},
		/*页面加载完后运行*/
		onLoad() {
			
			console.log("initilize")
			/*建立连接*/
			this.socket.on('connection', () => {
				console.log('connected')
			})
			console.log("done")
			//监听消息
			this.recvMsg()
		},
		methods: {
			//消息接收函数
			recvMsg: function() {
				//接收消息
				this.socket.on('recvMsg', (content) => {
					this.list.push(content)
					//滑动显示新消息
					// uni.pageScrollTo({
					// 	duration: 5,
					// 	scrollTop:this.list.length* 200
					// })
				});

				//接收新用户
				this.socket.on('newConnection', (name) => {
					console.log(name)
				});
			},
			
			//向服务器提交用户名
			onSubmitName:function(){
				if(this.name){
					this.socket.emit('newUser', this.Name)
				}
				
			},
			
			//消息发送函数
			sendMsg:function(){
				//更新数据表单
				if(this.content){
					this.list.push({
						"name": this.name,
						"msg": this.content
					})
					//向服务器发送数据
					this.socket.emit(
					'sendMessage',{
						"name":this.name,
						"msg": this.content
					});
					//发送完毕, 清空字符
					this.content=''
					//移动画面
					uni.pageScrollTo({
						duration:5,
						scorllTop: this.list.length*200
					})
					} 
				else{
					//发送空字串，提示错误
					uni.showToast({
						title:'请不要发送空消息！'
					})
				}
			}
		}
	}
</script>

<style>
	page {
		width: 750rpx;
		background-color: #3F536E;
	}
	
	/*顶部用户名设置*/
	.topInput{
		display:flex;
		flex-direction:row;
		align-items: center;
	}
	
	.inputname{
		width: 80%;
		height: 60rpx;
		border-radius: 2rpx;
		background-color: #ffffff;
	}
	
	.submitName{
		width: 20%;
		height: 60rpx;
		border-radius: 2rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	/*消息框*/
	.messages{
		width: 710rpx;
		padding: 20rpx;
	}
	

	/*每一条消息的发送者*/
	.name {
		margin-right: 10rpx;
	}

	/*每一条消息的内容*/
	.msg {
		background-color: #C0C0C0;
		border-radius: 10rpx;
		margin: 20rpx 0 0;
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-bottom: 5rpx;
	}

	/*底部发送模块*/
	.send {
		position: fixed;
		bottom: 0;
	}

	/*底部输入框*/
	.input {
		width: 710rpx;
		padding: 20rpx;
		border-radius: 20rpx;
	}
</style>
