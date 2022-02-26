
if(window.screen.width <= 428) {
  document.write('<script src="scripts/mobile.js"></script>');
} else if(window.screen.width >= 768) {
    document.write('<script src="scripts/pc.js"></script>');
}

let article2_div3_li1_a = document.querySelector('article:nth-child(2) div:nth-child(3) li:nth-child(1) a');
let article2_div3_li2_a = document.querySelector('article:nth-child(2) div:nth-child(3) li:nth-child(2) a');
let article2_div3_div = document.querySelector('article:nth-child(2) div:nth-child(3) div');

let a = article2_div3_div, blobfile, jsonfile;

article2_div3_li1_a.addEventListener('click', function() {
  if(!a.firstElementChild) {
    getvideo('images/周杰伦-稻香.mp4');
  } else if(a.firstElementChild.nodeName !== 'VIDEO' && a.lastElementChild.nodeName !== 'VIDEO') {
    getvideo('images/周杰伦-稻香.mp4');
  } 
});

article2_div3_li2_a.addEventListener('click', function() {
  if(!a.firstElementChild) {
    getjson('json/beautiful_essay.json');
  } else if(a.firstElementChild.nodeName !== 'P' && a.lastElementChild.nodeName !== 'P') {
    getjson('json/beautiful_essay.json');
  } 
});

function getvideo(url) {
  fetch(url)
    .then(function(response) {
      return response.blob();
    }).then(function(blob) {
      blobfile = blob;
      let objectURL = URL.createObjectURL(blob);
      let video = document.createElement('video');
      let source = document.createElement('source');
      video.controls = true;
      video.width = '300';
      source.src = objectURL;
      source.type = 'video/mp4';
      a.appendChild(video);
      video.appendChild(source);
    }).catch(function(err) {
      alert('出错了：' + err.message)});
}

function getjson(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
       jsonfile = json;
       let para = document.createElement('p');
       for(let i=0; i<json.text.length; i++) {
         if(i === json.text.length-1) {
           para.innerHTML += json.text[i];
         } else {
             para.innerHTML += json.text[i] + '<br>';
         }
       }  
       a.appendChild(para);
    }).catch(function(err) {
      alert('出错了： ' + err.message)});
}

let db;
window.onload = function() {
  if(blobfile !== undefined) {
    let file1 = { name: 'images/周杰伦-稻香.mp4', source: blobfile };
    setTimeout(savefile, 1000);
    setTimeout(displayfile, 2000);
}
  if(jsonfile !== undefined) {
    let file2 = { name: 'json/beautiful_essay.json', source: jsonfile };
    setTimeout(savefile, 1000);
    setTimeout(displayfile, 2000);
  }

function savefile() {
  let objectStore = db.transaction(['video_os'], 'readwrite').objectStore('video_os');
  let request1 = objectStore.add(file1);
  let request2 = objectStore.add(file2);
    request1.onsuccess = function() {
      console.log('视频存储成功');
    };
    request1.onerror = function() {
      console.log('视频存储失败');
    };
    request2.onsuccess = function() {
      console.log('视频存储成功');
    };
    request2.onerror = function() {
      console.log('视频存储失败');
    };
}

function displayfile() {
  let objectStore = db.transaction(['video_os']).objectStore('video_os');
  let request1 = objectStore.get(file1.name);
  request1.onsuccess = function(e) {
    let e_blob = e.target.result.blob;
    let objectURL = URL.createObjectURL(e_blob);
    let video = document.createElement('video');
    let source = document.createElement('source');
    video.controls = true;
    video.width = '300';
    source.src = objectURL;
    source.type = 'video/mp4';
    a.appendChild(video);
    video.appendChild(source);
    console.log('视频显示成功');
  };

  request1.onerror = function() {
    getvideo(file1.name);
    console.log('视频显示成功');
  };

  let request2 = objectStore.get(file2.name);
  request2.onsuccess = function(e) {
    let e_json = e.target.result.json;
    let para = document.createElement('p');
      for(let i=0; i<e_json.text.length; i++) {
        if(i === e_json.text.length-1) {
          para.innerHTML += e_json.text[i];
        } else {
            para.innerHTML += e_json.text[i] + '<br>';
        }
      }  
    a.appendChild(para);
    console.log('视频显示成功');
  };

  request2.onerror = function() {
    getvideo(file2.name);
    console.log('视频显示成功');
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
  objectStore.createIndex('source', 'source', { unique: false });
  console.log('Database setup complete');
};

};



