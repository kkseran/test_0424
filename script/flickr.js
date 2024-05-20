// 키 : 192e9539d6e5c6edba197c04a566bb64
// 비밀 : ebf65a038802e809

// 동작하고자 하는 DOM요소를 변수에 넣어야 함
let body = document.querySelector('body');
let frame = document.querySelector('#list');
let base = 'https://www.flickr.com/services/rest/?';
let method1 = 'flickr.interestingness.getList';
let key = '192e9539d6e5c6edba197c04a566bb64';
let per_page = '20';
let url = `${base}mathod==${method1}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;
