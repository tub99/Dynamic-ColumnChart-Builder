var c,ctx; // c: canvas
var arrowUp, arrowLeft, arName=[], arValue=[], strTitle;

///////////////////////////////////////////////
document.getElementById("btDrawChart").addEventListener("click",drawChart);
document.getElementById("btSubmit").addEventListener("click",getData);
///////////////////////////////////////////////
function getData()
{
	arName.push(document.getElementById("tfName").value);
	arValue.push(document.getElementById("tfValue").value);
	document.getElementById("tfName").value="";
	document.getElementById("tfValue").value="";
}
function drawChart()
{
    var total = 0;
    var gapBetweenBars = 10;
    var i;
    var scaleInterval = 50;
    var padding = 50;
    var originX = padding;
    var originY = c.height - padding;
    var lengthOfYAxis = c.height - 2 * padding;
    var lengthOfXAxis = c.width - 2 * padding;
    var firstBarX = 30; // bar drawing starts from 30

    // clear canvas
    ctx.clearRect(0,0,c.width,c.height);

    // draw axes
    drawAxis(originX, originY, lengthOfXAxis, lengthOfYAxis);

    // add title of the chart
    strTitle = document.getElementById("tfTitle").value;
    addText("Title : " + strTitle,"25px Arial", "#0000ff", originX, 25); // 25px below the top canvas border
    
    // add markers on y axis
    var howManyMarker = Math.floor((lengthOfYAxis)/scaleInterval) - 1; // -1 to omit the top marker
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
    var max = Math.max.apply(null, arValue);
    var scaleY = ((c.height - 150)*total)/max; // artemp[0] is the highest value

    var barWidth = (c.width - 150 - (arValue.length - 1) * gapBetweenBars) / arValue.length;
    if(barWidth > 50)
    {
        barWidth = 50;
    }

    // draw bar chart
    for(i=0; i<arValue.length ; i++)
    {
        var temp = (arValue[i] / total) * scaleY;
        var barx = originX + firstBarX + i*(barWidth + gapBetweenBars);
        var adjustment = 5;
        ctx.fillStyle = "#ffff00";
        ctx.fillRect(barx, originY - 2, barWidth, -temp);
        addItemName(arName[i], barx + barWidth/2 + adjustment, originY - temp - adjustment);
    }
}
function drawMarker(txt, posx, posy)
{
	addText(txt, "16px Arial", "#000000", posx, posy + 5);
	ctx.strokeStyle = "#000000";
	ctx.moveTo(posx + 32, posy);
	ctx.lineTo(posx + 37, posy);
	ctx.stroke();
}
function addText(txt, font, color, posx, posy)
{
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.fillText(txt, posx, posy);
}
function drawAxis(originx,originy,lengthx,lengthy)
{
	ctx.strokeStyle = "#000000";
	ctx.moveTo(originx,originy);
	ctx.lineTo(originx + lengthx, originy);
	ctx.stroke();
	ctx.moveTo(originx, originy);
	ctx.lineTo(originx, originy - lengthy);
	ctx.stroke();
	ctx.drawImage(arrowUp, originx - arrowUp.width/2, originy - lengthy - 8);
	ctx.drawImage(arrowLeft, originx + lengthx - 8, originy - arrowLeft.height/2);
	ctx.fillStyle = "#000000";
	addText("x","16px Arial", "#000000", originx + lengthx - 2, originy + 20);
    addText("y","16px Arial", "#000000", originx - 15, originy - lengthy + 5);
    addText("o","16px Arial", "#000000", originx - 15, originy + 15);
}
window.onload = function() {
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    arrowUp = document.getElementById("arrowUp");
    arrowLeft = document.getElementById("arrowLeft");
};
function addItemName(txt, posx, posy)
{
	ctx.save();
    ctx.translate(posx, posy);
    ctx.rotate(-Math.PI/3);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(txt, 0, 0);
    ctx.restore();
}