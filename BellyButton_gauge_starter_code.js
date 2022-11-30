// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;

    // Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = samples.filter(sampleObj =>sampleObj.id ==sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
    // Create a variable that holds the first sample in the array.
    var sampleResult = sampleArray[0];

    //  2. Create a variable that holds the first sample in the metadata array.
    var result = resultArray[0]; 

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = sampleResult.otu_ids;
    var otuLabel = sampleResult.otu_labels;
    var sampleValues = sampleResult.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var washFreq = parseFloat(result.wfreq);

    // Create the yticks for the bar chart.
    var yticks = otuIds.map(id => "OTU " + id).slice(0,10).reverse()
    var xticks = sampleValues.slice(0,10).reverse(); 
    var xlabels = otuLabel.map(label => "Type: " + label).slice(0,10).reverse();

    var bubbleId = otuIds 
    var bubbleValues = sampleValues
    var bubbleLabels = otuLabel

    // Use Plotly to plot the bar data and layout.
     // 8. Create the trace for the bar chart. 
     let trace = {
      x: xticks,
      y: yticks,
      type: "bar",
      hovertext: xlabels, 
      marker: {
        line: {
          width: .25
        }  
      },
      orientation: "h"
      };
    var barData = [trace]

    // 9. Create the layout for the bar chart. 
    var barLayout = {
    title: "Top 10 Bacteria Species (OTUs) Found",
    x: {title: "Sample Values"},
    y: {title: "OTU"}
    }; 

    Plotly.newPlot("bar", barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    // 1. Create the trace for the bubble chart.

    var bubbleData = [{
      x: bubbleId,
      y: bubbleValues, 
      text: bubbleLabels,
      mode: "markers", 
      marker: {
        color: bubbleValues,
        size: bubbleValues, 
        colorscale: "Earth"
      },
      type: "scatter",
     }   
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      xaxis: {title: "OTUs"}, 
      yaxis: {title: "Sample Values"}, 
      title: "Bacteria Cultures per Sample", 
      hovermode: bubbleLabels
      };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [ 
      {
        domain: {x: [0,1], y: [0,1]},
                 value: washFreq, 
                 title: {text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per week"}, 
                 type: "indicator",
                 mode: "gauge+number" , 
                 gauge: {
                  axis: {
                    range: [null, 10], 
                    tickwidth: 1, 
                    tickcolor: "gray"}, 
                 bar: {color: "black"},
                 steps: [
                  {range: [0,2], color: "red"},
                  {range: [2,4], color: "orange"},
                  {range: [4,6], color: "yellow"},
                  {range: [6,8], color: "green"}, 
                  {range: [8,10], color: "blue"}
                 ]}} 
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {width: 450, height: 450, margin: {t:0, b:0}};     

    // 6. Use Plotly to plot the gauge data and layout. 
    Plotly.newPlot("gauge", gaugeData, gaugeLayout); 
  })};
