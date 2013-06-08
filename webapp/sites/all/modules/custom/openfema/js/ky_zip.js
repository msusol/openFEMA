(function ($) {

    // get variables from drupal
    var openfema = Drupal.settings.openfema;

    var width = 960,
        height = 500;

    var color = d3.scale.threshold()
        .domain([30, 60, 120, 360])
        .range(["#ffffcc","#c2e699","#78c679","#31a354","#006837"]);

// A position encoding for the key only.
    var x = d3.scale.linear()
        .domain([0, 390])
        .range([0, 240]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(13)
        .tickValues(color.domain());

// Kentucky State Plane, Single Zone
// ftp://kygeonet.ky.gov/kygeodata/standards/Ky_StatePlane.pdf
    var projection = d3.geo.conicConformal()
        .rotate([85 + 45 / 60, -36 - 20 / 60])
        .parallels([37 + 05 / 60, 38 + 40 / 60])
        .scale(7090)
        .center([-0.04940, 1.50406])
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("container").append("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g")
        .attr("class", "key")
        .attr("transform", "translate(40,40)");

    g.selectAll("rect")
        .data(color.range().map(function(d, i) {
            return {
                x0: i ? x(color.domain()[i - 1]) : x.range()[0],
                x1: i < color.domain().length ? x(color.domain()[i]) : x.range()[1],
                z: d
            };
        }))
        .enter().append("rect")
        .attr("height", 8)
        .attr("x", function(d) { return d.x0; })
        .attr("width", function(d) { return d.x1 - d.x0; })
        .style("fill", function(d) { return d.z; });

    g.call(xAxis).append("text")
        .attr("class", "caption")
        .attr("y", -6)
        .text("Population per square mile");

    d3.json(openfema.data_path + "ky-counties.json", function(error, ky) {
        var counties = topojson.feature(ky, ky.objects.counties);

        svg.append("g")
            .attr("class", "county")
            .selectAll("path")
            .data(counties.features)
            .enter().append("path")
            .attr("d", path)
            .style("fill", function(d) { return color(d.density = d.properties.population / d.properties.area); })
            .append("title")
            .text(function(d) { return d.properties.name + ": " + d.density.toFixed(0) + "/mi.²"; });

        svg.append("path")
            .datum(topojson.mesh(ky, ky.objects.counties, function(a, b) { return a !== b; }))
            .attr("class", "county-border")
            .attr("d", path);

        svg.append("path")
            .datum(topojson.mesh(ky, ky.objects.counties, function(a, b) { return a === b; }))
            .attr("class", "state-border")
            .attr("d", path);
    });

})(jQuery);