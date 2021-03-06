let express = require('express');
let app = express();

let server = require('http').Server(app);//1
let io = require('socket.io')(server);//2

server.listen(process.env.PORT || 3000, () => {
  console.log('Server started')
});//3

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.get('/', (req, res) => res.render('home'));

io.on('connection', socket => {
  console.log('Co nguoi ket noi');
  socket.on('CLIENT_SEND_MESSAGE', msg => {
    io.emit('SERVER_REPLY', socket.user + ':' + msg);
  });

  socket.on('NEW_USERNAME', username => {
    socket.user = username
  })
});
