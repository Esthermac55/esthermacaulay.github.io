import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let svg;
// let circle; // 
const width = 800;
const height = 600;
const duration = 800;
const maxCircles = 10;
const clickFrameCount = 5;

let circleData = []; // Array to keep track of our circless

async function prepareVis() {
  // svg = d3
  // .attr("height", height)
  // Set attributes for D3 container canvas


  svg = d3.select("body") // Or select your specific container ID
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid #ccc")
    .on("click", function(event) {
      // Get coordinates where user clicked on the canvas
      const [x, y] = d3.pointer(event);
      addNewCircle(x, y);
    });
}

function addNewCircle(x, y) {
  if (circleData.length >= maxCircles) return;

  const newCircle = { id: Date.now(), x: x, y: y };
  circleData.push(newCircle);

  const circles = svg.selectAll("circle")
    .data(circleData, d => d.id);

  circles.enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 20)
    .attr("fill", "black")
    .on("click", (event, d) => {
      event.stopPropagation(); // Stops the canvas from adding a circle when you click an existing one
      playAnimation(d3.select(event.currentTarget));
    });
}

async function drawVis() {
  // This function originally added one static circle. 
  // For Option 1, we add circles via the click event in prepareVis,
  // so we can leave this empty or use it for initial instructions.
  
  /* circle = svg
    .append("circle")
    .attr("r", 15)
    .attr("fill", "black")
    .attr("cx", 55)
    .attr("cy", 25)
    .on("click", playAnimation); 
  */
}

async function playAnimation(circleSelection) {
  let index = 0;

  const interval = setInterval(() => {
    let randomX = Math.random() * width;
    let randomY = Math.random() * height;
    let randomR = Math.random() * 25 + 5;

    
    circleSelection
      .transition()
      .duration(duration / 2) // Added duration for smooth movement
      .attr("cx", randomX)
      .attr("cy", randomY)
      .attr("r", randomR);
    
    // Set attributes for transition animation
    
    index++;
    if (index >= clickFrameCount) {
      clearInterval(interval);
    }
  }, duration);
}

async function runApp() {
  await prepareVis();
  await drawVis();

  // document.querySelector("#play").addEventListener("click",( )=>{
  //   playAnimation();
  // })
}

runApp();