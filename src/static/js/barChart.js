var group = 123;
    
function datasetBarChosen(group, datasetBarChart) {
        var ds = [];
        for (x in datasetBarChart) {
             if(datasetBarChart[x].studentid==group){
                 ds.push(datasetBarChart[x]);
             } 
            }

        return ds;
}
function datasetBarByToday(uniq,datasetBarChart) {
        ds=[];
	for (i in uniq)
	{
		tempD={};
		tempD["courseid"]=uniq[i];
		tempD["learninghours"]=0;
		var today = new Date();
        today.setHours(0, 0, 0, 0);
		tempD["date"]=today;
		ds.push(tempD);
	}
	for (i in datasetBarChart)
		{
			
			for(j in ds)
			{
				var dsdate = new Date(datasetBarChart[i].date);
				console.log(dsdate+" ");
				console.log(ds[j].date);
				if(datasetBarChart[i].courseid == ds[j].courseid && dsdate >= ds[j].date )
				{
					ds[j].learninghours = ds[j].learninghours + datasetBarChart[i].learninghours;
				}
			}
			
		}
        return ds;
}




function datasetBarByWeekly(uniq,datasetBarChart) {
	Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
}
        ds=[];
	for (i in uniq)
	{
		tempD={};
		tempD["courseid"]=uniq[i];
		tempD["learninghours"]=0;
		var today = new Date();
        today.setHours(0, 0, 0, 0);
		today = today.addDays(7)
		tempD["date"]=today;
		console.log("this week "+today);
		ds.push(tempD);
	}
	for (i in datasetBarChart)
		{
			
			for(j in ds)
			{
				var dsdate = new Date(datasetBarChart[i].date);
				if(datasetBarChart[i].courseid == ds[j].courseid && dsdate >= ds[j].date )
				{
					ds[j].learninghours = ds[j].learninghours + datasetBarChart[i].learninghours;
				}
			}
			
		}
        return ds;
}
function datasetBarByCourse(uniq,datasetBarChart) {
	ds=[];
	for (i in uniq)
	{
		tempD={};
		tempD["courseid"]=uniq[i];
		tempD["learninghours"]=0;
		ds.push(tempD);
	}

        for (i in datasetBarChart)
		{
			
			for(j in ds)
			{
				
				if(datasetBarChart[i].courseid == ds[j].courseid)
				{
					ds[j].learninghours = ds[j].learninghours + datasetBarChart[i].learninghours;
				}
			}
			
		}
	return ds;
}
function d3BarChartBase() {

    var margin = {top: 30, right: 5, bottom: 20, left: 50},
    width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom,
    colorBar = d3.scaleOrdinal(d3.schemeCategory10),
    barPadding = 1,
    misc = {ylabel: 7, xlabelH : 5, title:11};
    
    return {
        margin : margin, 
        width : width, 
        height : height, 
        colorBar : colorBar, 
        barPadding : barPadding,
        misc: misc
    };
}

function d3BarChart(datasetBarChart) {

	var uniq = _.keys(_.countBy(datasetBarChart, function(datasetBarChart) { return datasetBarChart.courseid; }));
	var newer = datasetBarByCourse(uniq,datasetBarChart);

	//var firstDatasetBarChart = datasetBarChosen(group, datasetBarChart);     
	var firstDatasetBarChart = datasetBarByWeekly(uniq,datasetBarChart);  

	var basics = d3BarChartBase();
	
	var margin = basics.margin,
		width = basics.width,
	   height = basics.height,
		colorBar = basics.colorBar,
        barPadding = basics.barPadding,
        misc = basics.misc
		;
					
	var 	xScale = d3.scaleLinear()
						.domain([0, firstDatasetBarChart.length])
						.range([0, width])
						;
						
	var yScale = d3.scaleLinear()
		   .domain([0, d3.max(firstDatasetBarChart, function(d) { return d.learninghours; })])
           .range([height, 0]);
	
	var svg = d3.select("#barChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id","barChartPlot")
    ;

    // Title

    svg.append("text")
    .attr("x", (width + margin.left + margin.right)/2)
    .attr("y", misc.title)
    .attr("class","title")				
    .attr("text-anchor", "middle")
    .text("Course-wise Breakdown of all learners");

    var plot = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + (margin.top + misc.ylabel) + ")");
            
    plot.selectAll("rect")
    .data(firstDatasetBarChart)
    .enter()
    .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
    .attr("width", width / firstDatasetBarChart.length - barPadding)   
        .attr("y", function(d) {
            return yScale(d.learninghours);
        })  
        .attr("height", function(d) {
            return height-yScale(d.learninghours);
        })
        .attr("fill", "#6B6B6B");
    
    	
	// Add y labels to plot	
	
	plot.selectAll("text")
	.data(firstDatasetBarChart)
	.enter()
	.append("text")
	.text(function(d) {
			return formatAsInteger(d.learninghours)+"%";
	})
	.attr("text-anchor", "middle")

	.attr("x", function(d, i) {
			return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
	})
	.attr("y", function(d) {
			return (yScale(d.learninghours) - misc.ylabel);
	})
	.attr("class", "yAxis")
    ;
    
    // Add x labels to chart	
	
    var xLabels = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + (margin.top + height + misc.xlabelH)  + ")");

    xLabels.selectAll("text.xAxis")
    .data(firstDatasetBarChart)
    .enter()
    .append("text")
    .text(function(d) { return d.courseid;})
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
        return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
    })
    .attr("y", 15)
    .attr("class", "xAxis")
    ; 			
}