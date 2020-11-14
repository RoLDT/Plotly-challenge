// Read Json using d3
d3.json("samples.json").then(function(data){
    console.log(data)
    // Add "names" into the dropdown menu
    var names = data.names;
    var opt = d3.selectAll("#selDataset");
    Object.entries(names).forEach(([index,value]) => {
        opt.append("option").text(value);
    });
});

function Plots(ID) {
    d3.json("samples.json").then((data) => {

        var samples = data.samples;

        var filteredSample = samples.filter(data => data.id.toString() === ID)[0];
        
        var sample_values = filteredSample.sample_values.slice(0,10).reverse();
        var otu_ids = filteredSample.otu_ids.slice(0,10).reverse();
        var otu_labels = filteredSample.otu_labels.slice(0,10).reverse();

        var otu_ids = otu_ids.map(n => "OTU " + n);

        //console.log(sample_values);
        //console.log(otu_ids);
        //console.log(otu_labels);

        var traceBar = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };

        var dataBar = [traceBar];

        var layoutBar = {
            title: "Subject's Bellybutton Biodiversity",
            xaxis: {title: "Quantity"},
            yaxis: {title: "Label"},
        };

        var traceBubble = {
            x:,
            y:,
            
        }

        Plotly.newPlot("bar", dataBar, layoutBar);
    });
};

Plots("940");