  //Must delete <script type="text/javascript"> when used in external file
 //Set title for piece
   var visTitle = "UK Budget 2017:";
   var visDescr1_1 = "The Uk budget was announced on 22nd November 2017. Some measures will result in an ";
   var visDescr1_2 = "increase in revenue";
   var visDescr1_3 = ", others in a ";
   var visDescr1_4 = "decrease to revenue" ;
   var visDescr1_5 = ".";
   var visDescr2 = "How do these compare across the whole budget?";
   var visDataNotes_1 = "Stacked bar charts are a more conventional way of displaying such data, but are difficult to interpret when category headings are very long. This chart design was 100% inspired by one published by the NYTimes."
   var visDataNotes_2 = "https://www.nytimes.com/interactive/2017/11/15/us/politics/every-tax-cut-in-the-house-tax-bill.html. Data source: https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/661480/autumn_budget_2017_web.pdf ";
   
//Create the svg container for title
   var divWidth = document.getElementById("d3-graph-1").clientWidth;
   console.log(divWidth);
   var svgTitleHeight = 50, svgTitleWidth = divWidth; //1250;
   var svgTitleContainer = d3.select("#d3-graph-1").append("svg") //Changed body to div - if this doesn't work, try
        .attr("height", svgTitleHeight)
        .attr("width", svgTitleWidth);
   var ourTitle = svgTitleContainer
       .append("text")
       .attr("font-family", "sans-serif") 
       .attr("font-size", "24px") 
       .attr("fill", "grey")
       .attr("text-anchor", "left")
       .attr("x", 0)
       .attr("y", svgTitleHeight -20 )
	.text(visTitle);
	
       

   var ourDesc1 = svgTitleContainer
       .append("text")
       .attr("font-family", "sans-serif") 
       .attr("font-size", "16px") 
       .attr("text-anchor", "left")
       .attr("x", 200)
       .attr("y", svgTitleHeight -30 )
       //.text( visDescr1) 

	.append("tspan")
	.text(visDescr1_1)
	.attr("fill", "grey")

	.append("tspan")
	.text(visDescr1_2)
	.attr("fill", "#35CCBE") //blue - now teal
	.attr("font-weight", "bold") 

	.append("tspan")
	.text(visDescr1_3)
	.attr("fill", "grey")
	.attr("font-weight", "normal") 

	.append("tspan")
	.text(visDescr1_4)
	.attr("fill", "#6B4CE8") //orange - now purple
	.attr("font-weight", "bold") 

	.append("tspan")
	.text(visDescr1_5)
	.attr("fill", "grey")
	.attr("font-weight", "normal") 

         
        ;  
   var ourDesc2 = svgTitleContainer
       .append("text")
       .attr("font-family", "sans-serif") 
       .attr("font-size", "16px") 
       .attr("fill", "grey")
       .attr("text-anchor", "left")
       .attr("x", 200)
       .attr("y", svgTitleHeight -10 )
       .text( visDescr2) 
        //.call(wrap, 10) 
        ; 
   
	//Start the d3.csv bit
	d3.csv("data/Autumn Budget 2017 - Footnote Actioned.csv", function (error,varSquareData) {
	
	//Test the link to csv is working
	//console.log(varSquareData2[0]);
	//varSquareData2.forEach( function (d) {
	//	console.log(d.Measure + ". Impact" + d.Impact);
	//});

	//Define the squares - Only used to test code before connecting to csv
   varSquareData2 = [{ "Measure": "Hello, this is where text A will go", "Impact": 20},
       { "Measure": "Hello, this is where text B will go", "Impact": 30},
       { "Measure": "Hello, this is where text C will go", "Impact": 10},
       { "Measure": "Hello, this is where text D will go", "Impact": 50},
       { "Measure": "Hello, this is where text E will go", "Impact": 10},
       { "Measure": "Hello, this is where text F will go", "Impact": -10},
       { "Measure": "Hello, this is where text G will go", "Impact": 20},
       { "Measure": "Hello, this is where text H will go", "Impact": 10},
       { "Measure": "Hello, this is where text I will go", "Impact": 180},
       { "Measure": "Hello, this is where text J will go", "Impact": 10},
       { "Measure": "Hello, this is where text K will go", "Impact": -200},
       { "Measure": "Hello, this is where text L will go", "Impact": 20},
       { "Measure": "Hello, this is where text M will go", "Impact": -50},
       { "Measure": "Hello, this is where text N will go", "Impact": 20},
       { "Measure": "Hello, this is where text O will go", "Impact": 20},
       { "Measure": "Hello, this is where text P will go", "Impact": 40},
       { "Measure": "Hello, this is where text Q will go", "Impact": 20},
       { "Measure": "Hello, this is where text R will go", "Impact": 20},
       ] ;


   //Define how many rows and columns you want in the grid
   var numRows = 5;
   //Divide the number of entries by the number of rows and round up to get number of columns required
   var numCols = Math.ceil(varSquareData.length / numRows);
   //Create a function to calculate the row position in the grid (assuming entries are made top to bottom, then left to right)
   //The % is the modulo operator and returns the remainder
   function RowPosition (i) { return (i % numRows) + 1;};
   function ColumnPosition (i) { return Math.floor( i / numRows) + 1; };
   //Create the svg container for vis
   var svgHeight = 300, svgWidth = divWidth; //1250; and 685 for height
   var svgContainer = d3.select("#d3-graph-1").append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);
   //Set margins for use inside the svg container
   var mgTop = 20, mgBottom = 20, mgLeft = 40, mgRight = 40 ;
   //Create a function to find the vertical centre point of each square, based on the row position
   var RowHeight = Math.floor((svgHeight - mgTop - mgBottom)/numRows);
   function RowCentre (i) { return ( RowPosition(i)-1)*RowHeight + RowHeight/2};
   //Create a function to find the horizontal centre point of each square, base on the column position
   var ColWidth = Math.floor((svgWidth - mgLeft - mgRight)/numCols);
   function ColCentre (i) { return ( ColumnPosition(i) - 1)*ColWidth + ColWidth/2};
   //For the squares - need to set up an array to hold the square lengths, calc the max length for scaling and an array to contain colour assignment
   var largestSqLength = 0;
   var arrSqLength = [];
   var arrSqColours = [];
   var tempColour = "grey";
   var tempLength = 0;
   for (var i=0; i < varSquareData.length; i++) {
    tempLength = Math.sqrt(Math.abs(varSquareData[i].Impact));
    arrSqLength.push(tempLength);
    ///Find the largest impact
    //If statement (condition) ? <value if true> : <value if false>
    largestSqLength = (tempLength > largestSqLength) ? tempLength : largestSqLength;
    ///Assign colour and send to array
    tempColour = (varSquareData[i].Impact < 0) ? "#6B4CE8" : "#35CCBE" ; //FF8D00 = Orange, 0078B2 = Blue, 6B4CE8 = Purple, 35CCBE = Teal
    arrSqColours.push(tempColour);
   };

console.log(arrSqLength);
console.log("LargestSqLength is " + largestSqLength);   

	//Define the scale
   var linearScale = d3.scaleLinear()
        .domain([0, largestSqLength])
        .range([0, 1.2*RowHeight]);
   
   //Create a group to contain our squares (translated by mgTop and mgLeft)
   var SquaresGroup = svgContainer.append("g")
        .attr("transform", "translate(" + mgLeft + "," + mgTop + ")");
   //Add squares to the group
   var ourSquares = SquaresGroup.selectAll("rect")
        .data(varSquareData)
        .enter()
        .append("rect");
   var ourSquareAttr = ourSquares
         .attr("x", function (fn1, i) {return ColCentre(i) - (linearScale(arrSqLength[i])/2);})
         .attr("y", function (fn1, i) {return RowCentre(i) - (linearScale(arrSqLength[i])/2);})
         .attr("height", function (fn, i) {return Math.floor(linearScale(arrSqLength[i])) ;})
         .attr("width", function (fn, i) {return Math.floor(linearScale(arrSqLength[i])) ;})
         .attr("fill", function (fn, i) {return arrSqColours[i] ;})
         .attr("fill-opacity", 0.25)
         .attr("stroke", function (fn, i) {return arrSqColours[i] ;})
         ;
   
//Prep for adding text elements by creating a function to wrap text
     	var tempLineCount; //This will be used to offset text later
	var arrLineCount = Array(varSquareData.length).fill(1);
	
	//Define a function to wrap text - code adapted from Mike Bostock's 'Wrapping Long Labels' bl.ock https://bl.ocks.org/mbostock/7555321
      function wrap(text, width) { //Text here is actually an array of (text?) items
	//For each item - execute the following function
      	var j = 0;
	text.each(function() {
        //Set a variable called text, which is this current object
        var text = d3.select(this);
        //Set an array called words by returning the text part of the current object and splitting it into array elements according to the white space and then reverses the order - so "Hello how are you?" becomes words = {"you?"" , "are" , "how", "Hello"}
           //console.log(text);
           var words = text.text().split(/\s+/).reverse(),
           word,
           line = [],
           lineNumber = 0,
           lineHeight = 1.1, // ems
           //y is the y position of the current object
           x = text.attr("x"),
           y = text.attr("y"),
           //dy offset (to vertically nudge text for better alignment) is the dy of the current object
           dy = parseFloat(text.attr("dy")),
           //The SVG <tspan> element is used to draw multiple lines of text in SVG. Rather than having to position each line of text absolutely, the <tspan> element makes it possible to position a line of text relatively to the previous line of text
           //Add a tspan to the text part of the current object?  .text(null) deletes all existing text now that it's in the array words
           //Tspan positions text one after another (horizontally, unless we use dy to reposition vertically)
           
           tspan = text.text(null)
              .append("tspan")
              .attr("x", x) 
              .attr("y", y)
              .attr("dy", dy + "em");
        
        //Create a loop where word is the last word in the array of words (and that word is removed from the array - ie until there are no more words left)
        while (word = words.pop()) {
        tempLineCount = lineNumber + 2;  
	 
	//Add the word to the array called line
          line.push(word);
           //Join joins the elements of an array with the specified operator
           // So on first iteration the text of tspan is "Hello". On second iteration the text of tspan would be "Hello how" (as long as if statement below is not activated)
           tspan.text(line.join(" "));
           //If the length of tspan is longer than width
           if (tspan.node().getComputedTextLength() > width) {
             //Remove the last word in line array
             line.pop();
             //Reset the tspan text to be the same as before, but without the last word we added
             tspan.text(line.join(" "));
             //Reset line to just be the last word that we tried to add
             line = [word];
             //Add a new tspan - currently just containing the most recent word we tried to add
             tspan = text.append("tspan")
              .attr("x", x)
              .attr("y", y)
              //To keep the tspans one above the other keep x constant (eg 0) and use dy to specify the vertical displacement of each tspan
              .attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
           }
        }
	arrLineCount[j] = tempLineCount;
	j = j+ 1      
//Close the text.each function
	});
	
	//console.log(tempLineCount);
	console.log(arrLineCount);
   //Close the wrap function
   };



   //Add text elements
   var ourText = SquaresGroup.selectAll("text")
       .data(varSquareData)
       .enter()
       .append("text");
   var ourTextAttr = ourText
        .attr("font-family", "sans-serif") 
       // .attr("font-size", "12px") 
	.attr("font-size", function (fn, i) {return arrSqLength[i] > 0.5*largestSqLength ? "12px" : "10px";})
	.attr("font-weight", function (fn, i) {return arrSqLength[i] > 0.5*largestSqLength ? "bold" : "regular";})
        .attr("fill", function (fn, i) {return arrSqColours[i] ;})
        .attr("text-anchor", "middle")
        .attr("x", function (fn1, i) {return ColCentre(i) ;})
        .attr("y", function (fn1, i) {return RowCentre(i) ;})
	.attr("dy", "0")
        .text( function (d) { return d.Measure ; }) 
        .call(wrap, 0.9 * ColWidth) ;
	
	ourTextAttr
	.data(varSquareData)
	.attr("transform", "translate(0," + -12*2 + ")")
	//.attr("transform", function (i) { return "translate(0," + -12 * arrLineCount[i] + ")" ;})
	//.attr("transform", function (i) { return "translate(0," + 12 * arrLineCount[i] + ")";} )
        ;  

	console.log(arrSqLength[1]);
	console.log(arrLineCount);	
   
   //Add data notes
   //Create the svg container for data notes
   var svgNotesHeight = 50, svgNotesWidth = divWidth; //1250;
   var svgNotesContainer = d3.select("#d3-graph-1").append("svg")
        .attr("height", svgNotesHeight)
        .attr("width", svgNotesWidth);

   var ourNotesText_1 = svgNotesContainer
       .append("text")
       .attr("font-family", "sans-serif") 
       .attr("font-size", "12px") 
       .attr("fill", "grey")
       .attr("y", svgNotesHeight/2 )
       .attr("text-anchor", "right")
       .text(visDataNotes_1) ;

   var ourNotesText_2 = svgNotesContainer
	.append("text")
       .attr("font-family", "sans-serif") 
       .attr("font-size", "12px") 
       .attr("fill", "grey")
       .attr("y", svgNotesHeight - 10 )
       .attr("text-anchor", "right")
       .text(visDataNotes_2) ;
       
      

//Close the d3.csv bit
}
);
// Must delete </script> when used in external js file