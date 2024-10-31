// Liste des Game Masters avec leur formation pour chaque salle
const GAMEMASTERS = [
  { id: 1, name: "John", trained_rooms: [2, 3, 5] },
  { id: 2, name: "Alice", trained_rooms: [4, 10] },
  { id: 3, name: "David", trained_rooms: [5] },
  { id: 4, name: "Emily", trained_rooms: [8, 6, 2, 7] },
  { id: 5, name: "Michael", trained_rooms: [9, 1, 4, 3, 11, 8, 6, 12] },
  { id: 6, name: "Sophia", trained_rooms: [7, 10] },
  { id: 7, name: "Daniel", trained_rooms: [8] },
  { id: 8, name: "Olivia", trained_rooms: [3, 9] },
  { id: 9, name: "Matthew", trained_rooms: [2, 6, 1, 7, 3, 4] },
  { id: 10, name: "Emma", trained_rooms: [5, 4] },
  { id: 11, name: "James", trained_rooms: [11, 6] },
  { id: 12, name: "Isabella", trained_rooms: [7, 4, 12] },
  { id: 13, name: "William", trained_rooms: [11, 12] },
  { id: 14, name: "Ava", trained_rooms: [9, 11, 10] },
  { id: 15, name: "Benjamin", trained_rooms: [8, 4] },
  { id: 16, name: "Mia", trained_rooms: [1, 3, 7, 5, 8] },
  { id: 17, name: "Ethan", trained_rooms: [4, 2] },
  { id: 18, name: "Charlotte", trained_rooms: [10] },
  { id: 19, name: "Alexandre", trained_rooms: [9, 2, 8] },
  { id: 20, name: "Harper", trained_rooms: [1, 12] },
];

// Liste des salles avec identifiants et noms
const ROOMS = [
  { id: 1, name: "Le Braquage à la française" },
  { id: 2, name: "Le Braquage de casino" },
  { id: 3, name: "L'Enlèvement" },
  { id: 4, name: "Le Métro" },
  { id: 5, name: "Les Catacombes" },
  { id: 6, name: "Assassin's Creed" },
  { id: 7, name: "L'Avion" },
  { id: 8, name: "La Mission spatiale" },
  { id: 9, name: "Le Tremblement de terre" },
  { id: 10, name: "Le Cinéma hanté" },
  { id: 11, name: "Le Farwest" },
  { id: 12, name: "Mission secrète" },
];

// Mélange aléatoire d'un tableau
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// Solution 1 : file d'attente pour chaque salle
const assignWithQueue = () => {
  let gamemasters = shuffleArray([...GAMEMASTERS]);
  let assignments = {};
  let queue = [...ROOMS];
  let assignedGMs = new Set();

  while (queue.length) {
    let room = queue.shift();
    let assigned = false;

    for (let gm of gamemasters) {
      if (!assignedGMs.has(gm.id) && gm.trained_rooms.includes(room.id)) {
        assignments[room.name] = gm.name;
        assignedGMs.add(gm.id);
        assigned = true;
        break;
      }
    }

    if (!assigned) {
      console.log(`Impossible d'assigner ${room.name}. Réessayer...`);
      return assignWithQueue();
    }
  }

  console.log("Assignation complète avec file d'attente :");
  console.table(assignments);
};

// Solution 2 : par nombre de salles compatibles
const assignWithWeighting = () => {
  let gamemasters = shuffleArray([...GAMEMASTERS]);
  let assignments = {};
  let assignedGMs = new Set();

  for (let room of ROOMS) {
    let bestFit = null;

    for (let gm of gamemasters) {
      if (!assignedGMs.has(gm.id) && gm.trained_rooms.includes(room.id)) {
        if (
          !bestFit ||
          gm.trained_rooms.length < bestFit.trained_rooms.length
        ) {
          bestFit = gm;
        }
      }
    }

    if (bestFit) {
      assignments[room.name] = bestFit.name;
      assignedGMs.add(bestFit.id);
    } else {
      console.log(`Impossible d'assigner ${room.name}. Réessayer...`);
      return assignWithWeighting();
    }
  }

  console.log("Assignation complète avec pondération des Game Masters :");
  console.table(assignments);
};

// Fonction principale
const main = () => {
  console.log("Choisissez une solution d'assignation :");
  console.log("1 - File d'attente");
  console.log("2 - Pondération des Game Masters");

  const solution = 1; // (1 ou 2) pour la solution souhaitée

  switch (solution) {
    case 1:
      assignWithQueue();
      break;
    case 2:
      assignWithWeighting();
      break;
    default:
      console.log("Solution non reconnue.");
  }
};

main();
