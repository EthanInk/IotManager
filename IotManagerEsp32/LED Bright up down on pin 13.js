var ledValue = 0;
var addTo = 0.1;
setInterval(()=>{
  analogWrite(13, ledValue);
  ledValue += addTo;
  if(ledValue >= 1) addTo *= -1;
},100);