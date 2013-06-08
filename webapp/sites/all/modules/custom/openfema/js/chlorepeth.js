(function ($) {

    // get variables from drupal
    var openfema = Drupal.settings.openfema;

    var width = 960,
        height = 500;

    var rateById = d3.map();

    var quantize = d3.scale.quantize()
        .domain([0, .15])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

    var path = d3.geo.path();

    var svg = d3.select("container").append("svg")
        .attr("width", width)
        .attr("height", height);

    queue()
        .defer(d3.json, openfema.d_path + "us.json")
        .defer(d3.tsv, openfema.d_path + "unemployment.tsv", function(d) { rateById.set(d.id, +d.rate); })
        .await(ready);

    function ready(error, us) {
        svg.append("g")
            .attr("class", "counties")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("class", function(d) { return quantize(rateById.get(d.id)); })
            .attr("d", path);

        svg.append("path")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("class", "states")
            .attr("d", path);
    }

})(jQuery);