
var url = "../data/samples.json";


function optionChanged(newSample){
DemoData(newSample);
//createbarchart();
//createbubblechart();


}



function init(){
 var dropdown = d3.select("#selDataset");

    d3.json(url).then(function(data){

    data.names.forEach((name)=>{
        dropodown
        .append("option")
        .text(name)
        .property('value',name);
    });

    DemoData(data.names[0]);
   // createbarchart();
   // createbubblechart();



    });
}


init();




function DemoData(sample){
    d3.json(url).then(function(data){

        var metaData = data.samples.filter(s=> s.id.toString()=== sample)[0];


        var demo = d3.select("#sample-metadata");

        demo.html("");

        Object.entries(metaData).forEach(([key,value])=>{

            demo.append('h4').text(`${key}:${value}`);
        } );

    });


}








function createbarchart(sample){

    d3.json(url).then(function(data){


        var sampleData = data.samples.filter(s=> s.id.toString()=== sample)[0];
        var otu_10 = sampleData.slice(0,10).reverse();
        var sampeValues = sampleData.sample_values.slice(0,10).reverse()


    
        //ClassActivities to make bar chart






    });

}