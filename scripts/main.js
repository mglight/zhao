let heading = document.querySelector('.welcome');

function identity() {
  let Name = prompt('请输入身份证：');
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
    heading.textContent = '欢迎你 ' + User;
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
