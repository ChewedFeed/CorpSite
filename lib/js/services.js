var raw = new XMLHttpRequest()
raw.open('GET', 'https://cms.chewedfeed.com/services', false)
raw.onreadystatechange = function() {
  if (raw.readyState === 4) {
    if (raw.status === 200 || raw.status == 0) {
      var allText = raw.responseText;
      var json = JSON.parse(allText);
      var html = '';
      var launchTime = Date.parse("January 1 2030 23:59:00");
      for (var i = 0; i < json.length; i++) {
        var year = json[i].launchDate.year
        var month = json[i].launchDate.month === 0 ? 1 : json[i].launchDate.month
        var day = json[i].launchDate.day
        var newLaunch = Date.parse(year + "-" + month + "-" + day + " 23:59:00");

        if (newLaunch < launchTime) {
          launchTime = newLaunch
        }

        var last = ''
        if (i === json.length - 1) {
          last = 'last'
        }

        var color = "drac-bg-red"
        if (json[i].progress <= 15) {
          color = "drac-bg-red"
        } else if (json[i].progress <= 30 && json[i].progress > 15) {
          color = "drac-bg-yellow"
        } else if (json[i].progress <= 45 && json[i].progress > 30) {
          color = "drac-bg-orange"
        } else if (json[i].progress <= 60 && json[i].progress > 45) {
          color = "drac-bg-pink"
        } else if (json[i].progress <= 75 && json[i].progress > 60) {
          color = "drac-bg-purple"
        } else if (json[i].progress <= 90 && json[i].progress > 75) {
          color = "drac-bg-cyan"
        } else if (json[i].progress <= 100 && json[i].progress > 90) {
          color = "drac-bg-green"
        }

        html += '<div class="twocol services_item ' + last +'">'
        html += '<a href="' + json[i].url + '">'
        html += '<div class="icon_wrapper ' + color + '">'
        html += '<div class="icon_box">'
        html += '<i class="fa-' + json[i].icon + ' icon-8x"></i>'
        html += '<span class="services_arrow ' + color + '"></span>'
        html += '</div>'
        html += '</div>'
        html += '<h2>' + json[i].name + '</h2>'
        html += '<p>' + json[i].description + '</p>'
        html += '</a>'
        html += '</div>'
      }
      document.getElementById('soon').innerHTML = html
    }

    $(document).ready(function(){
      $("#countdown").countdown({
          date: launchTime,
          format: "on"
        },
        function() {
          // callback function
        });
    })
  }
}
raw.send(null)
