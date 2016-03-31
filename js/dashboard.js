// line chart: number of Black ppl killed per month
var monthsChart = c3.generate({
   bindto: '#monthsChart',
   data: {
       x: 'month',
     //  y: 'num',
       names: {
           month: 'Month',
           num: 'Number'
       },
       type: 'line',
       colors: {
         num: '#9b0b45'  
       },
       url: '/mpvdashboard/data/blk_count.csv'
   },
   axis: {
       x: {
           type: 'timeseries',
           tick: {
               format: '%m/%Y'
           }
       },
       y: {
           label: {
               text: 'Number of Black people killed',
               position: 'outer-middle'
           },
           min: 0
       }
   },
   legend: {
       show: false
   },
   tooltip: {
       /*format: {
           title: function(d) { return d.month; },
           value: function(d) { 
               var timeformat = d3.time.format('%b %Y');
               return timeformat.parse(d);
           }
       }*/
   }
});

// bar chart: Black ppl killed per million vs. white
var ratesChart = c3.generate({
    bindto: '#ratesChart',
    data: {
        url: '/mpvdashboard/data/rates.csv',
        type: 'bar',
        x: 'race',
        y: 'rate',
        names: {
            race: 'Race',
            rate: 'Rate per million residents, 2014'
        },
        
        color: function(inColor, data) {
            var cols = ['#0b459b', '#9b0b45', '#459b0b'];
            if (data.index !== undefined) {
                return cols[data.index];
            }
            return inColor;
        }
        
    },
    legend: {
        show: false
    },
    axis: {
        x: {
            type: 'category'
        }
    },
    tooltip: {
        format: {
            value: function(value) {
                var format = d3.format('.02f');
                return format(value);
            }
        }
    }
});

var armedChart = c3.generate({
   bindto: '#armedChart',
   data: {
       url: '/mpvdashboard/data/armed3.csv',
       type: 'bar',
       groups: [['un2', 'arm2']],
       x: 'race',
       names: {
           race: 'Race',
           un2: 'Unarmed',
           arm2: 'Armed / unknown'
       },
       colors: {
           un2: '#9b0b45',
           arm2: '#999'
       }
   },
   axis: {
       rotated: true,
       x: {
           type: 'category'
       },
       y: {
           tick: {
               format: d3.format('%')
           },
           max: 1
       }
   },
   tooltip: {
       format: {
           value: function(value) {
               var format = d3.format('%');
               return format(value);
           }
       }
   }
});

var citiesChart = c3.generate({
  bindto: '#citiesChart',
  data: {
    url: '/mpvdashboard/data/cities.csv',
    type: 'bar',
    x: 'name',
    y: 'rate',
    names: {
      rate: 'Rate per million',
      num: 'Number'
    },
    hide: 'num'
  },
  size: {
    height: 600
  },
  axis: {
    rotated: true,
    x: {
      type: 'category',
      tick: {
        multiline: false
      }
    },
    y: {
     
    }
  },
  color: {
    pattern: ['#9b0b45', '#999']
  },
  tooltip: {
    format: {
      value: function(val, ratio, id) {
        if (id === 'rate') {
          return d3.round(val, 2);
        } else {
          return val;
        }
      }
    }
  }
});

// pictogram 
function charges() {
    var width = 400;
    var height = 410;
    
  //  var elemWidth = document.getElementById('chargesChart').clientWidth;
//    width = elemWidth - 20;
    var svg = d3.select('#chargesChart').append('svg')
        .attr('viewBox', '0 0 ' + width + ' ' + height);
      //.attr('width', width)
      //.attr('height', height);
    
    svg.append('defs')
      .append('g')
      .attr('id', 'iconCustom')
      .append('path')
      .attr('d', 'M 7.7155588,15.698556 C 7.0712713,15.118495 6.2538955,14.858416 4.4616653,14.660496 3.1715837,14.519057 2.4721969,14.372585 2.0186434,14.149477 1.5446864,13.917137 0.8861225,13.227677 0.62654077,12.69224 0.22972206,11.87395 -0.04650034,10.627976 0.02123995,9.9612588 0.04008526,9.7752158 0.21621204,9.0840238 0.41262022,8.4240518 0.9421962,6.6435898 1.0182878,6.0994538 0.8599124,5.2227018 0.75269723,4.6294288 0.5824444,4.1945178 0.26447358,3.7015578 0.11970275,3.4771288 6.8571591e-4,3.2525168 -8.4340869e-6,3.2025048 -7.1621409e-4,3.1525498 0.33942828,2.5915428 0.7558688,1.955982 1.1722744,1.3203954 1.5880412,0.6614773 1.6797864,0.4917354 l 0.1667811,-0.3085785 0.33214,0.1682387 c 0.1826738,0.09252 0.5586865,0.2484809 0.8355758,0.3465545 1.4999793,0.5313065 3.189574,0.3558946 4.5355978,-0.470915 L 7.9194741,0 8.2000701,0.2167107 c 0.3843199,0.2968375 1.0092617,0.5787422 1.706063,0.7694891 0.5147259,0.1409318 0.6966569,0.160561 1.5299249,0.165121 1.049418,0.00604 1.373592,-0.062277 2.269186,-0.4757758 0.240274,-0.1109586 0.454826,-0.2017298 0.476757,-0.2017298 0.02194,0 0.102001,0.1135176 0.177899,0.2522776 0.07587,0.1387623 0.472358,0.7547199 0.881027,1.3688956 0.832252,1.2506064 0.787603,1.0643944 0.395922,1.6514144 -0.311712,0.467084 -0.467139,1.015527 -0.494049,1.743497 -0.03002,0.812984 0.06627,1.399999 0.465723,2.839947 0.402494,1.4507 0.457662,1.9063042 0.330627,2.7311292 -0.272888,1.771731 -1.29886,2.997367 -2.831986,3.38272 -0.20391,0.05127 -0.916015,0.176827 -1.582454,0.278988 -2.005543,0.30743 -2.5452589,0.475236 -3.1684797,0.985099 -0.1744419,0.142678 -0.3241916,0.25824 -0.3327878,0.256778 -0.00865,-0.0018 -0.1472343,-0.121129 -0.3081286,-0.265881 z');
    
    var index = d3.range(346);
    var charge = 338;
    var xpad = 20;
    var ypad = 20;
    var cols = Math.floor(width / xpad);
    var rows = Math.floor(height / ypad);
    
    var chargeData = [{
      'name': 'No known charges',
      'color': '#888888'
    }, {
      'name': 'Charges filed',
      'color': '#9b0b45'
    }];
    
    svg.append('g')
      .selectAll('use')
      .data(index)
      .enter()
      .append('use')
        .attr('xlink:href', '#iconCustom')
        .attr('x', function(d) {
          var rem = d % cols;
          console.log(d);
          return rem * xpad;
        })
        .attr('y', function(d) {
          var whole = Math.floor(d/cols);
          return whole * ypad;
        })
        .attr('class', function(d) {
          if (d < charge) { return 'icon-gray'; } 
          else { return 'icon-pink'; }
        });
        
    
    var legend = svg.selectAll('.legend')
      .data(chargeData)
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        return 'translate(0,' + (height - 25 - i * 20) + ')';
      });
    legend.append('rect')
      .attr('x', 10)
      .attr('y', 4)
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d, i) {
        return d.color;
    });
    
    legend.append('text')
      .attr('x', 24)
      .attr('y', 8)
      .attr('dy', '.4em')
      .attr('font-size', 'small')
      .text(function(d) { return d.name; });
        
}

function map() {
    var dataset = {};

    d3.csv('/mpvdashboard/data/stateRates.csv', function(data) {
  

      var onlyVals = data.map(function(d) {
        return +d.ratePerMil;
      });
      var min = Math.min.apply(null, onlyVals);
      var max = Math.max.apply(null, onlyVals);
      var colors = d3.scale.linear()
        .domain([min, max])
        .range(['white', '#9b0b45']);
      
      data.forEach(function(d) {
        //console.log(d);
        var state = d.state;
        var rate = +d.ratePerMil;
        dataset[state] = {
          numberOfThings: rate,
          fillColor: colors(rate)
        };
    
    });


  var map = new Datamap({
    element: document.getElementById('statesChart'),
    scope: 'usa',
    fills: {
      defaultFill: '#aaaaaa'
    },
    data: dataset,
    responsive: true,
    geographyConfig: {
      borderColor: '#555',
      popupTemplate: function(geo, data) {
        if (!data) { return; }
        return ['<div class="hoverinfo">', '<strong>', geo.properties.name, '</strong>', '<br>Rate per million: ', +data.numberOfThings.toFixed(2), '</div>'].join('');
      }
    }
  });

});

}

$(document).ready(function() {
    charges();
    map();
    
    
    $('#ratelink').click(function() {
      citiesChart.hide('num');
      citiesChart.show('rate');
      
    });
    
    $('#numlink').click(function() {
      citiesChart.hide('rate');
      citiesChart.show('num');
      
    });
    
});
