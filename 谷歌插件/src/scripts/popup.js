import ext from "./utils/ext";
import axios from "axios";
import storage from "./utils/storage";
var popup = document.getElementById("_c_app");
storage.get('color', function (resp) {
  var color = resp.color;
  if (color) {
    popup.style.backgroundColor = color
  }
});
// var template = (data) => {
//   var json = JSON.stringify(data);
//   return (`
//   <div class="site-description">
//     <h3 class="title">${data.title}</h3>
//     <p class="description">${data.description}</p>
//     <a href="${data.url}" target="_blank" class="url">${data.url}</a>
//   </div>
//   <div class="action-container">
//     <button data-bookmark='${json}' id="save-btn" class="btn btn-primary">Save</button>
//   </div>
//   `);
// }
// var renderMessage = (message) => {
//   var displayContainer = document.getElementById("display-container");
//   displayContainer.innerHTML = `<p class='message'>${message}</p>`;
// }

// var renderBookmark = (data) => {
//   var displayContainer = document.getElementById("display-container")
//   if(data) {
//     var tmpl = template(data);
//     displayContainer.innerHTML = tmpl;
//   } else {
//     renderMessage("Sorry, could not extract this page's title and URL")
//   }
// }

// ext.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
//   var activeTab = tabs[0];
//   chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, renderBookmark);
// });

// popup.addEventListener("click", function(e) {
//   if(e.target && e.target.matches("#save-btn")) {
//     e.preventDefault();
//     var data = e.target.getAttribute("data-bookmark");
//     ext.runtime.sendMessage({ action: "perform-save", data: data }, function(response) {
//       if(response && response.action === "saved") {
//         renderMessage("Your bookmark was saved successfully!");
//       } else {
//         renderMessage("Sorry, there was an error while saving your bookmark.");
//       }
//     })
//   }
// });

// var optionsLink = document.querySelector(".js-options");
// optionsLink.addEventListener("click", function(e) {
//   e.preventDefault();
//   ext.tabs.create({'url': ext.extension.getURL('options.html')});
// })


function showShip(text) {
  let shipBox = document.getElementById('_shipText')
  let ship = document.getElementById('_ship')
  shipBox.innerText = text
  ship.style.display = 'block'
  // shipBox.style.width = shipBox.clientWidth+'px'
  setTimeout(() => {
    if (ship.className.indexOf('shipShow') === -1) {
      ship.className += ' shipShow'
    }
    setTimeout(() => {
      setTimeout(() => {
        ship.style.display = 'none'
      }, 300)
      ship.className = 'ship'
    }, 1200)
  }, 200)

}

var _c_item_id = document.getElementById("_c_item_id");

storage.get('data', function (res) {
  if (res) {
    let tempData = res
    for (let y = 0; y < res.data.length; y++) {
      var el = document.createElement('div')
      el.className = '_c_item_list'
      el.innerHTML = `<span>${res.data[y].describe}</span><span>${res.data[y].key}</span><span contenteditable="true" class="code">等待获取</span> <span class="_c_remove" style="color: red;font-size: 12px;border: 1px solid red">移除</span>`
      el.setAttribute('key', res.data[y].key)
      _c_item_id.appendChild(el)
      el.addEventListener("click", function (e) {
        if (e.target && e.target.className.indexOf("_c_remove")!==-1) {
          for (let i = 0; i < document.getElementsByClassName('_c_item_list').length; i++) {
            document.getElementsByClassName('_c_item_list')[i].setAttribute('index', i)
          }
          let r_dom_index = this.getAttribute('index')
          document.getElementsByClassName('_c_item_list')[r_dom_index].remove()
          tempData.data.splice(r_dom_index, 1)
          storage.set(tempData, function () {
          })
        }
      })
    }
  }
});

var _c_button = document.getElementById("_c_button");

_c_button.addEventListener("click", function (e) {
  var el = document.createElement('div')
  el.className = '_c_item_list'
  el.innerHTML = `<span>${document.getElementById('_c_describe').value}</span><span>${document.getElementById('_c_key').value}</span><span contenteditable="true" class="code">等待获取</span> <span class="_c_remove" style="color: red;font-size: 12px;border: 1px solid red">移除</span>`
  el.setAttribute('key', document.getElementById('_c_key').value)
  _c_item_id.appendChild(el)

  let allData = {data: []}
  storage.get('data', function (res) {
    if (res) {
      allData = res
    }
    // alert(JSON.stringify(res))
    allData.data.push({
      describe: document.getElementById('_c_describe').value,
      key: document.getElementById('_c_key').value
    })
    storage.set(allData, function () {
    })
    // var _c_save_item = document.getElementsByClassName("_c_save_item");
    el.addEventListener("click", function (e) {
      // alert(e.target.className)
      if (e.target && e.target.className.indexOf("_c_remove")!==-1) {
        for (let i = 0; i < document.getElementsByClassName('_c_item_list').length; i++) {
          document.getElementsByClassName('_c_item_list')[i].setAttribute('index', i)
        }
        let r_dom_index = this.getAttribute('index')
        allData.data.splice(r_dom_index, 1)
        storage.set(allData, function () {
        })
        // alert(r_dom_index)
        document.getElementsByClassName('_c_item_list')[r_dom_index].remove()
      }
    })
  });
})
// _get_google_code


var _get_google_code = document.getElementById("_get_google_code");
_get_google_code.addEventListener("click", function (e) {
  // console.log(666)
  showShip('获取中..')
  let formData = new FormData();
  let key = []
  for (let i = 0; i < document.getElementsByClassName('_c_item_list').length; i++) {
    key.push(document.getElementsByClassName('_c_item_list')[i].getAttribute('key'))
  }
  formData.append('code', key.join(','));
  var url = 'http://106.53.29.199:8080/code';
  axios({
    url: url,
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data: formData
  }).then((res) => {
    // alert(res.data)
    showShip('获取成功')
    let _c_code = res.data
    for(let z = 0;z<_c_code.length;z++){
      document.getElementsByClassName('_c_item_list')[z].getElementsByClassName('code')[0].innerHTML = _c_code[z]
    }
  }).catch((error) => {
    alert(error)
    console.log(error)
  });
})


// C:\Users\Administrator\AppData\Local\Programs\Python\Python38-32\Scripts\;C:\Users\Administrator\AppData\Local\Programs\Python\Python38-32\;C:\Program Files\EsafeNet\Cobra DocGuard Client;C:\Program Files\JetBrains\CLion 2019.1.2\bin;C:\Program Files\Bandizip\;C:\Users\Administrator\AppData\Roaming\npm;C:\Users\Administrator\AppData\Local\BypassRuntm;C:\Users\Administrator\go\bin;c:\Go\bin;C:\Program Files\Git;C:\Users\Administrator\AppData\Local\GitHubDesktop\bin;C:\Users\Administrator\AppData\Local\Programs\Python\Python38-32;%PyCharm Community Edition%
