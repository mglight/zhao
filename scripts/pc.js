
let address_div2_btn1 = document.querySelector('address div:nth-child(2) button:nth-of-type(1)');
let address_div2_btn2 = document.querySelector('address div:nth-child(2) button:nth-of-type(2)');
let address_div2_p1 = document.querySelector('address div:nth-child(2) p:nth-of-type(1)');
let address_div2_p2 = document.querySelector('address div:nth-child(2) p:nth-of-type(2)');

let address_div1_a2 = document.querySelector('address div:nth-child(1) a:nth-child(2)');
let address_div1_a2_img = document.querySelector('address div:nth-child(1) a:nth-child(2) img');
let footer_div_a1 = document.querySelector('footer > div a:nth-child(1)');
let footer_div_a2 = document.querySelector('footer > div a:nth-child(2)');
let footer_div_a1_img = document.querySelector('footer > div a:nth-child(1) img');
let footer_div_a2_img = document.querySelector('footer > div a:nth-child(2) img');

let alink = [address_div1_a2, footer_div_a1, footer_div_a2];
let alink_img = [address_div1_a2_img, footer_div_a1_img, footer_div_a2_img];
let img_src1 = ['images/微信.svg', 'images/mozilla.svg', 'images/github.svg'];
let img_src2 = ['images/微信2.svg', 'images/mozilla2.svg', 'images/github2.svg'];


for(let i=0; i<alink.length; i++) {
  alink[i].addEventListener('pointerover', function() {
    alink_img[i].src = img_src2[i]; 
  });

  alink[i].addEventListener('pointerleave', function() {
    alink_img[i].src = img_src1[i]; 
  });
}

function displayhidden(target_element, classname1, classname2) {
	if(target_element.getAttribute('class') === classname1) {
    target_element.setAttribute('class', classname2);
	} else {
		target_element.setAttribute('class', classname1);
	}
}

address_div2_btn1.addEventListener('click', function() {
	displayhidden(address_div2_p1, 'address_hidden', 'address_display');
});

address_div2_btn2.addEventListener('click', function() {
	displayhidden(address_div2_p2, 'tel_hidden', 'tel_display');
});

let article1 = document.querySelector('article:nth-child(1)');
let article1_div = document.querySelector('article:nth-child(1) > div');
let sections = document.querySelectorAll('article:nth-child(1) section');

let n = 0, m = -200;

article1.addEventListener('pointerdown', function(e) {
	if(e.button === 0 && e.offsetY > 100) {
    if(e.offsetX > 307) {
      n -= 100;
      if(n >= m) {
  	    article1_div.style.left = n + '%';
      } else {
   	      n = m;
      }
    } else {
  	    n += 100;
        if(n <= 0) {
  	      article1_div.style.left = n + '%';
        } else {
            n = 0;
        }
    }
  }
});

article1.addEventListener('pointermove', function(e) {
	if(e.offsetY > 100) {
    if(e.offsetX > 307) {
  	  article1.style.cursor = 'url("images/右移.png"), auto';
    } else {
  	    article1.style.cursor = 'url("images/左移.png"), auto';
    }
  } else {
  	  article1.style.cursor = 'auto';
  }
});

let nav_li2_a = document.querySelector('nav li:nth-child(2) a');
let footer_privacy_a = document.querySelector('footer .footer_privacy a');
let article1_section4 = document.querySelector('article:nth-child(1) section:nth-child(4)');
let article1_section5 = document.querySelector('article:nth-child(1) section:nth-child(5)');

nav_li2_a.addEventListener('click', function() {  
  if(!article1_section4.firstElementChild) {
    cre_about(article1_section4);
    nm_left('-300%');
  } else if(!article1_section5.firstElementChild && article1_section4.getAttribute('class') !== 'about') {
      cre_about(article1_section5);
      nm_left('-400%');
  }
});

footer_privacy_a.addEventListener('click', function() {
 if(!article1_section4.firstElementChild) {
   cre_privacy(article1_section4);
   nm_left('-300%');
 } else if(!article1_section5.firstElementChild && article1_section4.getAttribute('class') !== 'privacy') {
     cre_privacy(article1_section5);
     nm_left('-400%');
 }
});


function nm_left(per) {
  n = -300;
  m -= 100;
  article1_div.style.left = per;
}

function cre_about(element) {
  let h2 = document.createElement('h2');
  let para = document.createElement('p');
  h2.textContent = '关于：';
  para.innerHTML = '这个网页外观是借鉴了wordpress里的一个<a href="https://cn.wordpress.org/themes/ameya/">主题</a>，图片取自阿里矢量图库，百度和<a href="https://unsplash.dogedoge.com/photos/yihlaRCCvd4">unsplash</a>';
  element.appendChild(h2);
  element.appendChild(para);
  element.setAttribute('class', 'about');
}

function cre_privacy(element) {
  let h2 = document.createElement('h2');
  let para = document.createElement('p');
  h2.textContent = '隐私：';
  para.textContent = '请勿使用本人照片';
  element.appendChild(h2);
  element.appendChild(para);
  element.setAttribute('class', 'privacy');
}

let article2_div3 = document.querySelector('article:nth-child(2) div:nth-child(3)');
let article2_div2_img = document.querySelector('article:nth-child(2) div:nth-child(2) img');
let nav_li3_a = document.querySelector('nav li:nth-child(3) a');

article2_div3.removeAttribute('id');
article2_div3_div.removeAttribute('id');

nav_li3_a.addEventListener('click', function() {
	displayhidden(article2_div2_img, 'myphoto_display', 'myphoto_hidden');
  displayhidden(article2_div3, 'mycollection_hidden', 'mycollection_display');
});

if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/zhao/cache_pc.js')
             .then(function() { console.log('Service Worker Registered'); });
}

