import { solution } from "../data/solution";
import BoxPackingVisual from "./scenes/BoxPackingVisual";

function app() {
  const visual = createVisual();
  setupRatioSlider(visual);
  loadSolution(visual);
}

function createVisual() {
  const canvas = document.querySelector("#bg");
  return new BoxPackingVisual(canvas);
}

function loadSolution(visual) {
  const binSizes = solution.map.sizes;
  visual.setBin(binSizes);
  visual.addBoxes(solution.boxes, binSizes);
  visual.addUnfitBoxes(solution.unfitted, binSizes);
}

function setupRatioSlider(visual) {
  const slider = document.getElementById("boxRatio");
  console.log(slider);
  visual.showBoxesByRatio(1);
  slider.oninput = () => {
    const boxRatio = +slider.value / 100;
    visual.showBoxesByRatio(boxRatio);
  };
}

app();
