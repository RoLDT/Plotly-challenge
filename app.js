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