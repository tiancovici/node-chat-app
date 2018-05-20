
var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

  let params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if(err) {
      alert(err);
      window.location.href = '/'
    } else {

    }
  });
});

function scrollToBottom() {
  //Selectors
  let messages = jQuery('#messages');
  let newMessage = messages.children('li');
  //Heights
  let clientHeight  =  messages.prop('clientHeight');
  let scrollTop     = messages.prop('scrollTop');
  let scrollHeight  = messages.prop('scrollHeight');

  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

//// D i s c o n n e c t /////
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
/// N e w    M e s s a g e ////
socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);

  scrollToBottom();
});

/// U p d a t e     U s e r    L i s t ////
socket.on('updateUserList', function(users) {
  let ol = jQuery('<ol></ol>');
  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});
// N e w    L o c a t i o n ////
socket.on('newLocationMessage', function (message) {
  // console.log('newLocation', message);
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  })
  jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  let messageTextBox = jQuery('[name=message]')

  socket.emit('createMessage', {
    text: messageTextBox.val()
  }, function(data) {
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation) {
    return alert('Gelocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location')
  });
});