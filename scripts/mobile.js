
let nav = document.querySelector('nav');
let nav_li5 = document.querySelector('nav li:nth-child(5)');
let nav_li5_img = document.querySelector('nav li:nth-child(5) img');

// 用指针控制导航栏的显示与隐藏
let n_down_y, n_touch = false, n_original = true, pointerup_front;

nav_li5.addEventListener('pointerdown', function(e) {
  n_down_y = e.screenY;
  n_touch = true;                   
  pointerup_front = true;  // 指针按下时默认pointerup事件会在pointerleave事件前面
  nav.style.transition = '';  // 防止pointermove事件一直执行动画
});

nav_li5.addEventListener('pointermove', function(e) {
  let moveY = e.screenY - n_down_y;
  if(n_touch) {
    if(n_original && moveY > 0 && moveY < 125) {  // 当导航栏隐藏并且往下拉，距离不超过减去最后一个li的导航栏的高度
      nav.style.bottom = `${-1.8 - (moveY/16).toFixed(1)}em`;
    } else if(!n_original && moveY < 0) {  // 当导航栏显示并且往上提
        nav.style.bottom = `${-9.6 - (moveY/16).toFixed(1)}em`;
    }
  }
});

nav_li5.addEventListener('pointerup', function(e) {
  if(pointerup_front) {  // pointerup事件在pointerleave事件之前则运行
  let moveY = e.screenY - n_down_y;
  if(moveY > 0) {
    nav_state('-9.6em', false, 'btn_down');
  } else {
      nav_state('-1.8em', true, 'btn_up');
  }

  nav.style.transition = 'bottom 0.5s';
}
});

nav_li5.addEventListener('pointerleave', function(e) {
  pointerup_front = false;  // pointerleave事件发生，则pointerup事件必然在pointerleave事件后面
  let moveY = e.screenY - n_down_y;
  if(moveY > 0) {
    nav_state('-9.6em', false, 'btn_down');
  } else {
      nav_state('-1.8em', true, 'btn_up');
  }

  nav.style.transition = 'bottom 0.5s';
});

let nav_li2_a = document.querySelector('nav li:nth-child(2) a');
let footer_privacy_a = document.querySelector('footer .footer_privacy a');
let article1_section4 = document.querySelector('article:nth-child(1) section:nth-child(4)');
let article1_section5 = document.querySelector('article:nth-child(1) section:nth-child(5)');

nav_li2_a.addEventListener('click', function() {  
  nav_state('-1.8em', true, 'btn_up');  // 隐藏导航栏为了不遮挡显示的内容

  if(!article1_section4.firstElementChild) {
    cre_about(article1_section4);
  } else if(!article1_section5.firstElementChild && article1_section4.getAttribute('id') !== 'about') {
      cre_about(article1_section5);
  }
});

function cre_about(element) {
  let h2 = document.createElement('h2');
  let para = document.createElement('p');
  h2.textContent = '关于：';
  para.innerHTML = '这个网页外观是借鉴了wordpress里的一个<a href="https://cn.wordpress.org/themes/ameya/">主题</a>，图片取自阿里矢量图库，百度和<a href="https://unsplash.dogedoge.com/photos/yihlaRCCvd4">unsplash</a>';
  element.appendChild(h2);
  element.appendChild(para);
  element.setAttribute('id', 'about');
}

footer_privacy_a.addEventListener('click', function() {
 if(!article1_section4.firstElementChild) {
   cre_privacy(article1_section4);
 } else if(!article1_section5.firstElementChild && article1_section4.getAttribute('id') !== 'privacy') {
     cre_privacy(article1_section5);
 }
});

function cre_privacy(element) {
  let h2 = document.createElement('h2');
  let para = document.createElement('p');
  h2.textContent = '隐私：';
  para.textContent = '请勿使用本人照片';
  element.appendChild(h2);
  element.appendChild(para);
  element.setAttribute('id', 'privacy');
}

function nav_state(distance, boo, classname) {
  nav.style.bottom = distance;
  n_original = boo;
  nav_li5_img.setAttribute('class', classname);
}

let footer_address_div2_btn1 = document.querySelector('footer address div:nth-child(2) button:nth-of-type(1)');
let footer_address_div2_btn2 = document.querySelector('footer address div:nth-child(2) button:nth-of-type(2)');
let footer_address_div2_p1 = document.querySelector('footer address div:nth-child(2) p:nth-of-type(1)');
let footer_address_div2_p2 = document.querySelector('footer address div:nth-child(2) p:nth-of-type(2)');
let footer_ul = document.querySelector('footer ul');
let footer_li3_btn = document.querySelector('footer li:nth-child(3) button');
let footer_li3_btn_img = document.querySelector('footer li:nth-child(3) button img');

footer_address_div2_btn1.addEventListener('click', function() {
  displayhidden1(footer_address_div2_p1, 'address_hidden', 'address_display');
});

footer_address_div2_btn2.addEventListener('click', function() {
  displayhidden1(footer_address_div2_p2, 'tel_hidden', 'tel_display');
});

footer_li3_btn.addEventListener('click', function() {
	displayhidden2(footer_ul, 'footer_ul_down', 'footer_ul_up', footer_li3_btn_img, 'btn_down', 'btn_up');
	footer_address_div2_p1.setAttribute('class', 'address_hidden');
	footer_address_div2_p2.setAttribute('class', 'tel_hidden');
});

function displayhidden1(target_element, classname1, classname2) {
	if(target_element.getAttribute('class') === classname1) {
    target_element.setAttribute('class', classname2);
	} else {
		target_element.setAttribute('class', classname1);
	}
}

function displayhidden2(target_element1, classname1, classname2, target_element2, classname3, classname4) {
	if(target_element1.getAttribute('class') === classname1) {
    target_element1.setAttribute('class', classname2);
    target_element2.setAttribute('class', classname3);
	} else {
		target_element1.setAttribute('class', classname1);
		target_element2.setAttribute('class', classname4);
	}
}

let article2_div1 = document.querySelector('article:nth-child(2) div:nth-child(1)');

let a_down_x, a_touch = false, a_original = true, adw = article2_div1.clientWidth;

article2_div1.addEventListener('pointerdown', function(e) {
  a_down_x = e.pageX;
  a_touch = true;
  article2_div1.style.transition = '';
});

article2_div1.addEventListener('pointermove', function(e) {
  let moveX = e.pageX - a_down_x;
  if(a_touch) {
    if(a_original && moveX > 0) {
      article2_div1.style.left = `${-70 + (moveX/adw).toFixed(2) * 100}%`;
    } else if(!a_original && moveX < 0) {
        article2_div1.style.left = `${(moveX/adw).toFixed(2) * 100}%`;
    } 
  }
});

article2_div1.addEventListener('pointerup', function(e) {
  let moveX = e.pageX - a_down_x;
  if(moveX >= 20) {
    article2_div1.style.left = '0';
    a_original = false;
  } else if(moveX >= 0) {
      article2_div1.style.left = '-70%';
      a_original = true;
  } else if(moveX >= -20) {
      article2_div1.style.left = '0';
      a_original = false;
  } else {
      article2_div1.style.left = '-70%';
      a_original = true;
  }
  
  article2_div1.style.transition = 'left 0.5s';
});

if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/zhao/cache_mobile.js')
             .then(function() { console.log('Service Worker Registered'); });
}
