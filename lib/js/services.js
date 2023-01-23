var raw = new XMLHttpRequest()
raw.open('GET', 'https://cms.chewedfeed.com/services', false)
raw.onreadystatechange = function() {
  if (raw.readyState === 4) {
    if (raw.status === 200 || raw.status == 0) {
      var results = []
      var nextServiceName = ""

      var allText = raw.responseText;
      var json = JSON.parse(allText);
      var html = '';
      var launchTime = Date.parse("January 1 2030 23:59:00");
      json.sort(function(a, b) {
        //return Date.parse(a.launchDate.year + "-" + a.launchDate.month + "-" + a.launchDate.day + " 23:59:00") > Date.parse(b.launchDate.year + "-" + b.launchDate.month + "-" + b.launchDate.day + " 23:59:00");
        return a.progress < b.progress;
      })
      for (var i = 0; i < json.length; i++) {
        var year = json[i].launchDate.year
        var month = json[i].launchDate.month === 0 ? 1 : json[i].launchDate.month
        var day = json[i].launchDate.day
        var newLaunch = Date.parse(year + "-" + month + "-" + day + " 23:59:00");

        if (newLaunch < launchTime) {
          launchTime = newLaunch
          nextServiceName = json[i].name
        }

        var last = ''
        if (i === json.length - 1) {
          last = 'last'
        }

        var color = "drac-bg-red"
        var prog = json[i].progress
        switch (true) {
          case (prog < 31 && prog >= 16):
            color = "drac-bg-orange"
            break;
          case (prog < 46 && prog >= 31):
            color = "drac-bg-yellow"
            break;
          case (prog < 61 && prog >= 46):
            color = "drac-bg-pink"
            break;
          case (prog < 76 && prog >= 61):
            color = "drac-bg-purple"
            break;
          case (prog < 91 && prog >= 76):
            color = "drac-bg-cyan"
            break;
          case (prog >= 91):
            color = "drac-bg-green"
            break;
          default:
            color = "drac-bg-red"
            break;
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
      console.log("Next service: " + nextServiceName)
      console.log("Next launch: " + launchTime)

      $("#service_launch_name").text(nextServiceName);
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
