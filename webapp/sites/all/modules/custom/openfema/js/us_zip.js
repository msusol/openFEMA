(function ($) {

    // get variables from drupal
    var openfema = Drupal.settings.openfema;

    var Chart = function (data) {

        var height = 500;
        var width  = 860;

        var projection = d3.geo.albersUsa().scale(1000);
        var coords = projection(['-98.00', '39.00']);     // center USA (lower 48)

        var svg = d3.select('#geo-map').append('svg')
            .attr('width', width)
            .attr('height', height);

        var group = svg.append('g')
            .attr('transform', 'translate(' + (-coords[0]+width/2) + ',' + (-coords[1]+height/2) + ')');

        d3.json(openfema.data_path + "us-states.json", function(json) {
            group.selectAll('path')
                .data(json.features)
                .enter().append('path')
                .attr('d', d3.geo.path().projection(projection))
                .attr('id', function(d){
                    return d.properties.code // state abbreviation
                })
                .style('fill', function(d){
                        return '#eee';
                })
                .style('stroke', 'white')
                .style('stroke-width', 1);
        });

        // Mark Labels and Symbols, append a new grouping so on top of map
        var rScale = d3.scale.pow()
            .domain([0, d3.max(data,function(d){return d.properties.totalFires;})])
            .range([0,3]);

        var labels = svg.append('g')
            .attr('transform', 'translate(' + (-coords[0]+width/2) + ',' + (-coords[1]+height/2) + ')');

        labels.selectAll('symbol')
            .data(data)
            .enter().append('circle')
            .attr('class', 'symbol')
            .attr('cx', function(d){
                var c = projection(d.geometry.coordinates);
                return c[0];
            })
            .attr('cy', function(d){
                var c = projection(d.geometry.coordinates);
                return c[1];
            })
            .attr('r', function(d) {
                return rScale(d.properties.totalFires);
            })
            .style('fill', 'red')
            .style('opacity', 0.4);

        if (0) {
            labels.selectAll("text")
                .data(data)
                .enter().append("svg:text")
                .text(function(d){
                    return d.properties.label;
                })
                .attr("class", "labels")
                .attr("x", function(d){
                    var c = projection(d.geometry.coordinates);
                    return c[0];
                })
                .attr("y", function(d){
                    var c = projection(d.geometry.coordinates);
                    return c[1];
                });
        }

    };

    var FireData = {

        getData: function(){
            var self = this;

            $.ajax({
                async: false,
                url: '/openfema_zip_query',
                data: {'state':'KY','zips':['40003','40865','41014']},
                dataType: "json",
                success: function(results) {
                    debugger;
                    if ( results['error'] ) {
                        self.error = results['error'];
                    } else {
                        self.results = results;
                    }
                },
                error: function (err) {
                    self.error = err.responseText;
                }
            });

        }

    };

    //FireData.getData();

    Chart(openfema.data);


})(jQuery);