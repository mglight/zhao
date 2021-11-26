

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
let select = document.querySelector('.watchthese select');
let myimage = document.querySelector('.watchthese img');

select.addEventListener('change', myphoto);

function myphoto() {
  let isit = select.value;
  if(isit === 'a') {
    myimage.src = "images/黑暗aa.webp";
    myimage.title = "https://unsplash.com/photos/HQPJEEjHqSE?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink";
  } else if(isit === 'b') {
    myimage.src = "images/黑暗2aa.webp";
    myimage.title = "https://unsplash.com/photos/gvb5EvxCYKE?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink";
  } else if(isit === 'c') {
    myimage.src = "images/蓝天aa.webp";
    myimage.title = "https://unsplash.com/photos/gGy0MQyUM38?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink";
  } else if(isit === 'd') {
    myimage.src = "images/女孩aa.webp";
    myimage.title = "https://unsplash.com/photos/HxyWQ6YPM80?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink";
  } else {
    myimage.src = "images/狗狗2aa.webp"; 
    myimage.title = "https://unsplash.com/photos/-XW35nYkRnk?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink";
  }
}
let a = document.querySelectorAll('li a');
let xiahx = document.querySelectorAll('li .x div');
let m = 100;
let n = 0 ;
      for(let i=0; i<a.length; i++) {
      a[i].addEventListener('pointerleave', loop); 
        function loop() {
          if(m>0) {
            m -= 5; 
            xiahx[i].style.width = m + '%';
            requestAnimationFrame(loop);
            if(m === 0) {
              n = 0;
            }
        } 
      }
      
      
      a[i].addEventListener('pointerover', loopa); 
        function loopa() {
          if(n<100) {
            n += 5;
            xiahx[i].style.width = n + '%';
            requestAnimationFrame(loopa);
            if(n === 100) {
              m = 100;
            }
        }   
      } 
    }
if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/zhao/scripts/mglightsite.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

let video = document.querySelector('aside video'); 
let db;
window.onload = function() {
let Blobb;
let request2 = new XMLHttpRequest();
      request2.open('GET', 'images/吹口哨.mp4');
      request2.responseType = 'blob';
      request2.onload = function() {
         Blobb = { name: 'images/吹口哨.mp4', mp4blob: request2.response };
      };
      request2.send();

setTimeout(savevideo, 3000);
setTimeout(displayVideo, 5000);

function savevideo() {
  let objectStore = db.transaction(['video_os'], 'readwrite').objectStore('video_os');
  let request = objectStore.add(Blobb);
  request.onsuccess = function() {
    console.log('视频存储成功');
  };
  request.onerror = function() {
    console.log('视频存储失败');
  };
}

function displayVideo() {
  let objectStore = db.transaction(['video_os']).objectStore('video_os');
  let request = objectStore.get('images/吹口哨.mp4');
  request.onsuccess = function(e) {
    let eee = e.target.result.mp4blob;
    let source = document.createElement('source');
    source.src = URL.createObjectURL(eee);
    source.type = 'video/mp4';
    video.appendChild(source);
    console.log('视频显示成功');
  };
  request.onerror = function() {
    fetch('images/吹口哨.mp4')
    .then(response => response.blob())
    .then(function(Blob) {
      let source = document.createElement('source');
      source.src = URL.createObjectURL(Blob);
      source.type = 'video/mp4';
      video.appendChild(source);
      console.log('视频显示成功');
    });
  };
}

let request = window.indexedDB.open('videos_db', 1);

request.onerror = function() {
  alert('数据库打开失败');
};

request.onsuccess = function() {
  console.log('Database opened successfully');
  db = request.result;
};

request.onupgradeneeded = function(e) {
  let db = e.target.result;
  let objectStore = db.createObjectStore('video_os', { keyPath: 'name' } );
  objectStore.createIndex('mp4blob', 'mp4blob', { unique: false });
  console.log('Database setup complete');
};

};
