

var config = {
  packages: [
    "107247", "107248"
  ],
  item_id: getParameterByName('id'),
  service_url: "https://services.inplayer.com"
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }


$('.inplayer-paywall-logout').parent().hide();

paywall.on('authenticated', function () {
  $('.inplayer-paywall-login').parent().hide();
  $('.inplayer-paywall-logout').parent().show();
});

paywall.on('logout', function () {
  location.reload();
});

function createItemElement(assetId, assetPhoto, assetTitle, assetDesc) {
  var output =
    '<div class="package-item"><div class="content" style="background-image:url(' +
    assetPhoto +
    ')">';
  output +=
    '<a href="./item.html?id=' +
    assetId +
    '" class="overlay-link"></a></div><div class="item-label"><div class="name">';
  output += '<h3>' + assetTitle + '</h3>';
  output += assetDesc;
  output += "</div>";
  output += "</div></div>";
  return output;
}


config.packages.forEach((package, i) => {
  $.get(config.service_url + "/items/packages/" + package, response => {
    // console.log(response.id)
    var packageTitle = response.title;

    $("#package-title-" + package).html(packageTitle);

    $.get(
      config.service_url + "/items/packages/" + package + "/items?limit=500",
      response => {
        console.log($('#package-title-' + package))

        var output = "";

        for (var i = 0; i < response.collection.length; i++) {
          var asset = response.collection[i];
          // var asset1 = asset.access_fees;

          var assetId = asset.id;
          var assetPhoto = asset.metahash.paywall_cover_photo;

          var assetDesc = asset.metahash.preview_description;
          // console.log(assetDesc);

          var assetTitle = asset.title;
          output += createItemElement(assetId, assetPhoto, assetTitle, assetDesc);
          document.getElementById(
            "package-items-" + package
          ).innerHTML = output;

        } // for


      }
    ); // get items
  }); // get packages
}); //for each
