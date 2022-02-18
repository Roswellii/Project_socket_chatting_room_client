

//构建支持
var app= require('express')
var http= require('http').createServer(app)
var io= require('socket.io')(http)
var express= require('express')


//跨域问题
//解决跨域问题
// app.all('*',function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     if (req.method == 'OPTIONS') {
//         res.send(200);   
//     }
//     else {
//         next();
//     }
// });


//socket连接
io.on('connection', (socket)=>{
    console.log('connected');
    socket.on('sendMessage', function(content){
        console.log(content)
        socket.broadcast.emit('recvMsg', content);
    })

});


http.listen(3030,()=>{
    console.log('server running');
})