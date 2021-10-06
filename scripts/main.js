

function identity() {
  let Name = prompt('请输入姓名：');
  localStorage.setItem('name', Name);
  password();
}

function password() {
  let Passworda = prompt('请输入密码：');
  localStorage.setItem('password', Passworda);
  again();
}

function again() {
  let Passwordb = prompt('确认您的密码：');
  if(localStorage.getItem('password')===Passwordb) {
    let User = localStorage.getItem('name');
    alert('欢迎你' + User);
  } else {
    alert('密码不正确！');
    again();
  }
}

if(localStorage.getItem('name')) {
  again();
} else {
  identity();
} 
let magenta = document.querySelector('.color p img:nth-of-type(1)');
let yellow = document.querySelector('.color p img:nth-of-type(2)');
let cyan = document.querySelector('.color p img:nth-of-type(3)');
let red = document.querySelector('.color p img:nth-of-type(4)');
let green = document.querySelector('.color p img:nth-of-type(5)');
let blue = document.querySelector('.color p img:nth-of-type(6)');

let para = document.querySelector('.color p');

magenta.onclick = function() {
  if(para.style.color === "black") {
  para.style.color = "rgb(228,0,127)";
  } else {
    para.style.color = "black";
  }
}
yellow.onclick = function() {
  if(para.style.color === "black") {
  para.style.color = "rgb(255,241,0)";
  } else {
    para.style.color = "black";
  }
  
}
cyan.onclick = function() {
  if(para.style.color === "black") {
  para.style.color = "rgb(0,160,233)";
  } else {
    para.style.color = "black";
  }
  
}
red.onclick = function() {
  if(para.style.color === "black") {
  para.style.color = "rgb(255,0,0)";
  } else {
    para.style.color = "black";
  }
  
}
green.onclick = function() {
  if(para.style.color === "black") {
  para.style.color = "rgb(0,255,0)";
  } else {
    para.style.color = "black";
  }
  
}
blue.onclick = function() {
  if(para.style.color === "black") {
  para.style.color = "rgb(0,0,255)";
  } else {
    para.style.color = "black";
  }
  
}
