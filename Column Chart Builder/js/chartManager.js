// The manager class is responsible for handling userData 
// and drawing a chart accordingly
function ChartManager() {
	var c,
		ctx, // c: canvas
		arrowUp,
		arrowLeft,
		arName=[],
		arValue=[],
		strTitle,
		// This function draws the label of the columns ie
		// the item name
		addItemName = function(txt, posx, posy) {
			ctx.save();
			ctx.translate(posx, posy);
			ctx.rotate(-Math.PI/3);
			ctx.font = "20px Arial";
			ctx.fillStyle = "#992551";
			ctx.fillText(txt, 0, 0);
			ctx.restore();

		},
		// drawing the axis of the Chart
		drawAxis = function(originx,originy,lengthx,lengthy) {
			// drawing the axis as a line and
			// giving the line various styling attributes
			ctx.strokeStyle = "#000000";
			// drawing horizonatal and vertical line of the chart
			ctx.moveTo(originx,originy);
			ctx.lineTo(originx + lengthx, originy);
			ctx.stroke();
			ctx.moveTo(originx, originy);
			ctx.lineTo(originx, originy - lengthy);
			ctx.stroke();
			// Images are used for the vertical arrow and horizontal arrow
			ctx.drawImage(arrowUp, originx - arrowUp.width/2, originy - lengthy - 8);
			ctx.drawImage(arrowLeft, originx + lengthx - 8, originy - arrowLeft.height/2);
			// line is black in color
			ctx.fillStyle = "#000000";
			// marking the x-axis,y-axis and origin
			addText("x","16px Arial", "#000000", originx + lengthx - 2, originy + 20);
			addText("y","16px Arial", "#000000", originx - 15, originy - lengthy + 5);
			addText("0","16px Arial", "#000000", originx - 15, originy + 15);
		},
		// This function helps to add a text Element to the chart 
		addText = function(txt, font, color, posx, posy) {
			// setting the font of the text
			ctx.font = font;
			// setting the color of the text
			ctx.fillStyle = color;
			ctx.fillText(txt, posx, posy);
		},
		// draws the lines of the axis
		drawMarker = function(txt, posx, posy) {
			addText(txt, "16px Arial", "#000000", posx, posy + 5);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(posx + 32, posy);
			ctx.lineTo(posx + 37, posy);
			ctx.stroke();
		};
	// This is the main function to draw the chart
	this.drawChart = function() {
		var total = 0,
			gapBetweenBars = 10,
			i,
			scaleInterval = 50,
			padding = 50,
			originX = padding,
			originY = c.height - padding,
			lengthOfYAxis = c.height - 2 * padding,
			lengthOfXAxis = c.width - 2 * padding,
			firstBarX = 30, // bar drawing starts from 30
			howManyMarker,
			max,
			scaleY,
			barWidth,
			temp,
			barx,
			adjustment;
		// clear canvas
		ctx.clearRect(0,0,c.width,c.height);

		// draw axes
		drawAxis(originX, originY, lengthOfXAxis, lengthOfYAxis);

		// add title of the chart
		strTitle = document.getElementById("tfTitle").value;
		addText("Title : " + strTitle,"20px Arial", "#2c4509", originX, 25); // 25px below the top canvas border

		// add markers on y axis
		howManyMarker = Math.floor((lengthOfYAxis)/scaleInterval) - 1; // -1 to omit the top marker
		for(i=1; i <= howManyMarker ; i++)
		{
			drawMarker(String(i*scaleInterval), originX - 35, originY - i*scaleInterval);
		}

		// find sum of all the values
		for(i=0; i<arValue.length ; i++)
		{
			total += Number(arValue[i]);
		}

		// find scale
		//var artemp = arValue; // to preserve original array of values
		//artemp.sort(function(a, b){return b-a}); // sorting in descending order
		max = Math.max.apply(null, arValue);
		scaleY = ((c.height - 150)*total)/max; // artemp[0] is the highest value

		barWidth = (c.width - 150 - (arValue.length - 1) * gapBetweenBars) / arValue.length;
		if(barWidth > 50)
		{
			barWidth = 50;
		}

		// draw bar chart
		for(i=0; i<arValue.length ; i++)
		{
			temp = (arValue[i] / total) * scaleY;
			barx = originX + firstBarX + i*(barWidth + gapBetweenBars);
			adjustment = 5;
			ctx.fillStyle = "#299ba0";
			ctx.fillRect(barx, originY - 2, barWidth, -temp);
			addItemName(arName[i], barx + barWidth/2 + adjustment, originY - temp - adjustment);
		}

	};
	// This function stores the data in array that the user
	// gives as input
	this.getData = function() {
		// names of items are stored in arName[]
		arName.push(document.getElementById("tfName").value);
		// values of items are stored in arValue[]
		arValue.push(document.getElementById("tfValue").value);
		document.getElementById("tfName").value="";
		document.getElementById("tfValue").value="";		
	};
	//This functions runs at first and loads the entire canvas
	this.loadElements = function() {
		//getting the canvas element and creating its context
		c = document.getElementById("canvas");
		ctx = c.getContext("2d");
		// arrowUp and down are the images of the axis-arrow
		arrowUp = document.getElementById("arrowUp");
		arrowLeft = document.getElementById("arrowLeft");
	}





}