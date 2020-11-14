// Read Json using d3
function init() {
    d3.json("samples.json").then(function(data){
        console.log(data)
        // Add "names" into the dropdown menu
        var names = data.names;
        var opt = d3.selectAll("#selDataset");
        Object.entries(names).forEach(([index,value]) => {
            opt.append("option").text(value);
        });
        const first = names[0];

        Populate(first);
    });
};


function Populate(ID) {
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

        //Bar chart
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
            yaxis: {title: "Label"}
        };
        //Bubble Chart
        //Have to use the "not reversed data" for the Bubble chart. 
        var traceBubble = {
            x: filteredSample.otu_ids,
            y: filteredSample.sample_values,
            mode: "markers",
            marker:{
                size: filteredSample.sample_values,
                color: filteredSample.otu_ids,
            },
            text: otu_labels
        };

        var dataBubble = [traceBubble];

        var layoutBubble = {
            title: "Sample size of each OTU",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Size"}
        }
        //Plotting.
        Plotly.newPlot("bar", dataBar, layoutBar);
        Plotly.newPlot("bubble", dataBubble, layoutBubble);

        //Demographic Table
        var metadata = data.metadata;

        var filteredMetadata = metadata.filter(data => data.id.toString() === ID)[0];
        
        var demographic = d3.select("#sample-metadata");
        demographic.html("");
        Object.entries(filteredMetadata).forEach((index, value) => {
            demographic.append("h6").text(index, ": " + value + "\n")
        });


    });
};

function optionChanged(newID) {
    Populate(newID)
};

init();