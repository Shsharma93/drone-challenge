const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  const { directions } = req.body;
  const moves = directions.split("");
  const singleDronePictures = singleDrone(moves);
  const doubleDronePictures = doubleDrone(moves);
  res.json({
    singleDrone: singleDronePictures,
    doubleDrone: doubleDronePictures
  });
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

const singleDrone = moves => {
  let point = {
    x: 0,
    y: 0
  };
  const pictures = {};

  moves.forEach(move => {
    processMoves(move, point, pictures);
  });
  return Object.keys(pictures).length;
};

const doubleDrone = moves => {
  let points = [
    {
      x: 0,
      y: 0
    },
    {
      x: 0,
      y: 0
    }
  ];

  const pictures = {};

  moves.forEach((move, index) => {
    index % 2 === 0
      ? processMoves(move, points[0], pictures)
      : processMoves(move, points[1], pictures);
  });
  return Object.keys(pictures).length;
};

const processMoves = (move, point, pictures) => {
  switch (move) {
    case "^":
      point.y += 1;
      break;
    case "v":
      point.y -= 1;
      break;
    case ">":
      point.x += 1;
      break;
    case "<":
      point.x -= 1;
      break;
    case "x":
      pictures[`${point.x},${point.y}`] === undefined
        ? (pictures[`${point.x},${point.y}`] = 1)
        : pictures[`${point.x},${point.y}`]++;
      break;
    default:
      throw new Error("Unexpected input");
  }
};
