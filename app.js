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

function buildBar(ID) {
    d3.json("samples.json").then((incomingData) => {

        function filterSamples(samples) {
            return samples.id === ID;
        }

        var sample = incomingData.filter(function(filterSamples) {
            console.log(sample);
        })

        


        //var sample_values = sample.sample_values.slice(0,10);
        //var otu_ids = sample.otu_ids.slice(0,10);
        //var otu_labels = sample.otu_labels.slice(0,10)



    });
};

buildBar(940);