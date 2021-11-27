let form = document.querySelector('form');
let wrap2 = document.querySelector('.wrap2');
let dateInput = document.querySelector('#date');
let weatherInput = document.querySelector('#weather');
let moodInput = document.querySelector('#mood');
let diaryInput = document.querySelector('#diary');
let ulEle = document.querySelector('ul');
let pEle = document.querySelector('p');
let save = document.querySelector('.buttons button:nth-of-type(1)');
let view = document.querySelector('.buttons button:nth-of-type(2)');
let del = document.querySelector('.buttons button:nth-of-type(3)');
let goback = document.querySelector('.buttons button:nth-of-type(4)'); 
let date = new Date();
dateInput.value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

let db;
window.onload = function() {
  let request = window.indexedDB.open('notes_db', 1);
 
request.onerror = function() {
  alert('数据库请求失败');
};

request.onsuccess = function() {
  console.log('数据库请求成功');
  db = request.result;
};

request.onupgradeneeded = function(e) {
  let db = e.target.result;
  let objectStore = db.createObjectStore('notes_os', { keyPath: 'date' });
  objectStore.createIndex('weather', 'weather', { unique: false });
  objectStore.createIndex('mood', 'mood', { unique: false });
  objectStore.createIndex('diary', 'diary', { unique: false });
  console.log('数据库设置成功');
};

form.addEventListener('submit', submitdata);
  function submitdata(e) {
    e.preventDefault();
    let newItem = { date: dateInput.value, weather: weatherInput.value, mood: moodInput.value, diary: diaryInput.value };
    let objectStore = db.transaction(['notes_os'], 'readwrite').objectStore('notes_os');
    let request = objectStore.add(newItem);
    request.onsuccess = function() {
      alert('日记已保存');
    };
    request.onerror = function() {
      alert('同一天的日记已经保存过了，或者您也可以重新写一份');
    };
}

let deleted;
view.addEventListener('click', function() {
  diaryInput.style.display = 'none';
  wrap2.style.display = 'flex';
  ulEle.style.display = 'block';
  pEle.style.display = 'block';
  save.style.display = 'none';
  del.style.display = 'inline-block';

  while (ulEle.firstChild) {
    ulEle.removeChild(ulEle.firstChild);
  }

  let transaction = db.transaction(['notes_os']);
  let objectStore = transaction.objectStore('notes_os');
  objectStore.openCursor().onsuccess = function(e) {
    let cursor = e.target.result;
    if(cursor) {
      let bEle = document.createElement('button');
      bEle.setAttribute('class', 'buttondate');
      bEle.setAttribute('type', 'button');
      ulEle.appendChild(bEle);
      bEle.textContent = cursor.key;
      let cursorval = cursor.value;

      bEle.addEventListener('click', function() {
        pEle.innerHTML = `${cursorval.date} ${cursorval.weather} ${cursorval.mood}<br>${cursorval.diary}`;
        deleted = cursorval.date;
      });
      cursor.continue();
    } else {
        if(!ulEle.firstChild) {
          pEle.innerHTML = '没有日记';
        }
    }
  }
});

goback.addEventListener('click', function() {
  diaryInput.style.display = 'inline-block';
  wrap2.style.display = 'block';
  ulEle.style.display = 'none';
  pEle.style.display = 'none';
  save.style.display = 'inline-block';
  del.style.display = 'none';
  pEle.innerHTML = '';
});

del.addEventListener('click', function() {
  let objectStore = db.transaction(['notes_os'], 'readwrite').objectStore('notes_os');
  let request = objectStore.delete(deleted);
  request.onsuccess = function() {
    pEle.innerHTML = '';
    let bElearray = document.querySelectorAll('ul button');
    for(let i=0; i<bElearray.length; i++) {
      if(bElearray[i].textContent === deleted) {
        bElearray[i].remove();
        console.log(deleted + '的日记已被删除');
      }
    }
  }; 
  request.onerror = function() {
    alert('删除失败');
  }
});
};
