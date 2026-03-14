const data = [50, 100, 75, 125, 90];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const svgWidth = 500;
const barWidth= 40;
const spacing = 20;
const totalBars = data.length;

const totalCharWidth = totalBars * barWidth + (totalBars - 1) * spacing;
const startX = (svgWidth - totalCharWidth) /2;

//container
const svgNS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(svgNS, "svg");

svg.setAttribute("width", "500");
svg.setAttribute("height", "300");

data.forEach((value, index) => {
     const xPosition = startX + index * (barWidth + spacing);

    const rect = document.createElementNS(svgNS, "rect");

    rect.setAttribute("x", xPosition);
    rect.setAttribute("y", 270 - value);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", value);
    rect.setAttribute("fill", "brown");

    const text = document.createElementNS(svgNS, "text");

    text.setAttribute("x", xPosition + barWidth / 2); // center under bar
    text.setAttribute("y", 300); // near bottom of SVG
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "14");

    text.textContent = days[index];

    svg.appendChild(text);

    svg.appendChild(rect);

// VALUE LABEL (hours on top of bar)
const valueText = document.createElementNS(svgNS, "text");

valueText.setAttribute("x", xPosition + barWidth / 2); 
valueText.setAttribute("y", 270 - value - 5); 
valueText.setAttribute("text-anchor", "middle");
valueText.setAttribute("font-size", "14");
valueText.setAttribute("font-weight", "bold");

valueText.textContent = 6.5 + "hrs";

svg.appendChild(valueText);



        const target = document.getElementById('target');
        const scoreDisplay = document.getElementById('score-display');
        let score = 0;

        // move the circle to a random coordinate
        function moveTarget() {
            // I multiply by 460/360 to keep the circle inside the 500x400 box
            const newX = Math.floor(Math.random() * 460) + 20;
            const newY = Math.floor(Math.random() * 360) + 20;

            // this will update the SVG attributes
            target.setAttribute('cx', newX);
            target.setAttribute('cy', newY);
        }

        // When the user clicks the circle
        target.addEventListener('mousedown', () => {
            score++; // Increase score
            scoreDisplay.textContent = score; // Update the HTML text
            moveTarget(); // Move immediately on click
        });

        // Make the circle "jump" every1 second
        setInterval(moveTarget, 1000);
});




document.getElementById("svgContainer").appendChild(svg);

