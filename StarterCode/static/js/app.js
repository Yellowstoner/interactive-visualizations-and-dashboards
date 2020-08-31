// Read the data
d3.json("data/samples.json").then(data => {
    console.log(data)
    var ids = data.samples[0].otu_ids;
    console.log(ids)
    var sampleValues = samples.samples[0].sample_values.slice(0, 10).reverse();
    console.log(sampleValues)
    var labels = sampledata.samples[0].otu_labels.slice(0, 10);
    console.log(labels)

    var OTU_top_ten = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
    var OTU_id = OTU_top_ten.map(d => "OTU " + d);

// Get the OTU id's adapted to the plot
    var labels = sampledata.samples[0].otu_labels.slice(0, 10);
    console.log("OTU_labels: ${labels}")
    var trace1 = {
        x: sampleValue,
        y: OTU_id,
        text: labels,
        type: "bar",
        orientation: "h"
    };
    
    // Create data variable
    var bardata1 = [trace1];

    // Create plot layout
    var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            yaxis:{ tickmode: "linear"},
            margin: {l: 100, r: 100, t: 100, b: 30}
    };
    
    // Create the bar plot
    Plotly.newPlot("bar", bardata1, barLayout);


    // Create bubble chart
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text: sampledata.samples[0].otu_labels
        };

        // Set the layout for the bubble plot
        var barLayout2 = {
            xaxis:{title: "OTU ID"},
            showlegend: false,
            height: 600,
            width: 600
        };

        // Creating data variable
        var bardata1 = [trace1];

    // Create the bubble plot
    Plotly.newPlot("bubble", bardata1, barLayout2);
    });


// Create the function to get the necessary data
function getDemoInfo(id) {
    d3.json("data/samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata)

        // Filter metadata
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demographic = d3.select("#sample-metadata");
        
        demographic.html("");
        Object.entries(result).forEach((key) => {
            demographic.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    };
}

// Change event function
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

// create the function for the initial data rendering
function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data) => {
        console.log(data)
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
        });
    };
init()