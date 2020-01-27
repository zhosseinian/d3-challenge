var margin = { top: 20, right: 20, bottom: 30, left: 40 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;


// setup x
var xValue = function(d) {
    return d.poverty;
  }, // data -> value
  xScale = d3.scaleLinear().range([0, width]), // value -> display
  xMap = function(d) {
    return xScale(xValue(d));
  }, // data -> display
  xAxis = d3.axisBottom(xScale);


// setup y
var yValue = function(d) {
    return d["obesity"];
  }, // data -> value
  yScale = d3.scaleLinear().range([height, 0]), // value -> display
  yMap = function(d) {
    return yScale(yValue(d));
  }, // data -> display
  yAxis = d3.axisLeft(yScale);


// setup fill color
var cValue = function(d) {
    return d.Manufacturer;
  },
  color = d3.scaleOrdinal(d3.schemeCategory10);
// add the graph canvas to the body of the webpage
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// add the tooltip area to the webpage
var tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// load data
d3.csv("data.csv").then(data => {
  // change string (from CSV) into number format
  console.log(data);
  data.forEach(function(d) {
    d.poverty = +parseInt(d.poverty);
    d.obesity = +parseInt(d.obesity);
  });

  console.log(data);
  data.forEach(function(d) {
    d.poverty = +parseInt(d.poverty);
    d.smoking = +parseInt(d.smoking);
  });

  console.log(data);
  data.forEach(function(d) {
    d.poverty = +parseInt(d.poverty);
    d.healthcare = +parseInt(d.healthcare);
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
  yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);
  
  
  // x-axis
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .style("transform", "translate(400px, 55px)")
    .attr("y", -26)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("In Poverty (%)");
  
  // y-axis
  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("y", -26)
    .attr("data-name", "obesity")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .attr("transform", "translate(10,250)rotate(-90)")
    .text("Obese (%)");

  // x-axis
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .style("transform", "translate(400px, 55px)")
    .attr("y", -26)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("In Poverty (%)");
  
  // y-axis
  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("y", -26)
    .attr("data-name", "smoking")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .attr("transform", "translate(10,250)rotate(-90)")
    .text("Smoking (%)");


// x-axis
  svg
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .append("text")
  .style("transform", "translate(400px, 55px)")
  .attr("y", -26)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("In Poverty (%)");

// y-axis
svg
  .append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("y", -26)
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .attr("transform", "translate(10,250)rotate(-90)")
  .text("Healthcare (%)");

  // draw dots
  svg
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", xMap)
    .attr("cy", yMap)
    .style("fill", function(d) {
      return color(cValue(d));
    })
    .on("mouseover", function(d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip
        .html(d["state"] + "<br/> (" + xValue(d) + ", " + yValue(d) + ")")
        .style("left", d3.event.pageX + 5 + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function(d) {
      tooltip
        .transition()
        .duration(500)
        .style("opacity", 0);
    });
});


scale y to chart height
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataArray)])
    .range([chartHeight, 0]);

// scale x to chart width
var xScale = d3.scaleBand()
    .domain(dataCategories)
    .range([0, chartWidth])
    .padding(0.1);

// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

// set x to the bottom of the chart
chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

// set y to the y axis
chartGroup.append("g")
    .call(yAxis);

// Create the rectangles using data binding
var barsGroup = chartGroup.selectAll("rect")
    .data(dataArray)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(dataCategories[i]))
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => chartHeight - yScale(d))
    .attr("fill", "green");


