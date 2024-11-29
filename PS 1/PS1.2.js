// PS 1.2 - Array of Objects
// Exercise 1
// const projects = [
//   { name: "Project A", duration: 12, status: "completed" },
//   { name: "Project B", duration: 8, status: "ongoing" },
//   { name: "Project C", duration: 10, status: "ongoing" },
//   { name: "Project D", duration: 6, status: "completed" },
// ];
// const ongoingProjects = [];
// for (let project in projects) {
//   if (projects[project]?.status == "ongoing") {
//     ongoingProjects.push(projects[project].name);
//   }
// }
// console.log(ongoingProjects);

// Exercise 2
// const cities = [
//   { name: "New York", population: 8000000, country: "USA" },
//   { name: "Toronto", population: 2800000, country: "Canada" },
//   { name: "Los Angeles", population: 4000000, country: "USA" },
//   { name: "London", population: 9000000, country: "UK" },
// ];
// let listOfCitiesInUSA = cities?.filter((city) => city?.country == "USA");
// console.log(listOfCitiesInUSA);

// Exercise 3
// const songs = [
//   { title: "Song A", artist: "Artist 1", duration: 4.5 },
//   { title: "Song B", artist: "Artist 2", duration: 5.2 },
//   { title: "Song C", artist: "Artist 3", duration: 3.8 },
//   { title: "Song D", artist: "Artist 4", duration: 6.0 },
// ];
// let firstSong = songs?.find((song) => song?.duration > 5);
// console.log(firstSong)

// Exercise 4
const animals = [
  { species: "Tiger", habitat: "Forest", population: 3000 },
  { species: "Elephant", habitat: "Savannah", population: 5000 },
  { species: "Panda", habitat: "Bamboo Forest", population: 2000 },
  { species: "Kangaroo", habitat: "Grassland", population: 10000 },
];

function updateAnimalPopulation(animals, species, newPopulation) {
  const animal = animals?.find((animal) => animal?.species == species);
  if (animal) {
    animal.population = newPopulation;
    console.log(`The updated population for ${species} is ${newPopulation}`);
  } else {
    console.log(`Species ${species} not found.`);
  }
  console.log(animal)
}
updateAnimalPopulation(animals, "Panda", 300);

// Exercise 5
// const players = [
//   { name: "Player A", team: "Team 1", goals_scored: 22 },
//   { name: "Player B", team: "Team 2", goals_scored: 18 },
//   { name: "Player C", team: "Team 1", goals_scored: 25 },
//   { name: "Player D", team: "Team 3", goals_scored: 15 },
// ];

// const playersScored = [];
// for (let player in players) {
//   if (players[player]?.goals_scored > 20) {
//     playersScored.push(players[player].name);
//   }
// }
// console.log(playersScored);

// Exercise 6
// const companies = [
//   { name: "Company A", industry: "Tech", employees: 500 },
//   { name: "Company B", industry: "Finance", employees: 300 },
//   { name: "Company C", industry: "Tech", employees: 700 },
//   { name: "Company D", industry: "Healthcare", employees: 400 },
// ];
// const filterCompanies = companies?.filter(
//   (company) => company?.industry == "Tech"
// );

// console.log(filterCompanies);

// Exercise 7
// const books = [
//   { title: "Book A", author: "Author 1", pages: 150 },
//   { title: "Book B", author: "Author 2", pages: 320 },
//   { title: "Book C", author: "Author 3", pages: 290 },
//   { title: "Book D", author: "Author 4", pages: 400 },
// ];
// const reOrderBooks = books?.sort((b1, b2) => b2?.pages - b1?.pages);
// console.log(reOrderBooks);

// Exercise 8
// const people = [
//   { name: "Person A", country: "India", age: 35 },
//   { name: "Person B", country: "USA", age: 28 },
//   { name: "Person C", country: "India", age: 32 },
//   { name: "Person D", country: "India", age: 24 },
// ];
// const oldPeople = [];
// for (let person in people) {
//   if (people[person]?.age > 30) {
//     oldPeople.push(people[person].name);
//   }
// }
// console.log(oldPeople);
