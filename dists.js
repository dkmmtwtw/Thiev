const osszes = 681080400;
const tenyezok = [1, 6, 15, 28, 45, 66, 91];
const szabalyok = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [7, 8], ["a", "b"]]; //TODO

const coordinates = { //TODO
  1: [65, 23],
  2: [43, 74],
  3: [78, 12],
  4: [96, 12],
  5: [42, 93],
  6: [67, 11],
  7: [00, 100]
}


/* let min = Number.MAX_SAFE_INTEGER;
let shortest = [];
for (let index = 3000; index <= 6000; index++) {
  let route = getRouteArray(index)
  console.log(route)
  let routeLength = getRouteLength(route);
  if (min > routeLength) {
    min = routeLength;
    shortest = route;
  }
}  */

function getRouteLength(route) {
  let length = 0;
  for (let index = 1; index < route.length; index++) {
    const point1 = coordinates[route[index-1]];
    const point2 = coordinates[route[index]];
    length+=pointsDistance(point1,point2)
  }
  return length;
}

function pointsDistance(point1, point2) {
  let x = abs(point1[0] - point2[0]);
  let y = abs(point1[1] - point2[1]);
  return Math.sqrt(x^2+y^2)
}

function abs(x) {
  let mask = x >> 31;
  x = x ^ mask;
  return x-mask;   
}

for (let index = 1; index < 1000; index++) {
  console.log(indexbolRoute(index))
  
}

function indexbolRoute(index){
  return kisIndexekbolRoute(NagyindexbolKisIndexek(index))
}

function kisIndexekbolRoute(kisIndexek){
  let route = [];
  for (let i = 0; i < kisIndexek.length; i++) {
    const Index = kisIndexek[i];
    KisIndexbolInsertS(Index,route,szabalyok[i]);
  }
  // console.log(kisIndexek)
  return route;
}


function NagyindexbolKisIndexek(index){
  let kisIndexek = []
  let aktualisIndex = index;
  let aktualisSokasag = osszes;
  for(let i = 0; i <7; i++){
    let r = sokasagNCentilisebeEsikX(aktualisSokasag,tenyezok[i],aktualisIndex)
    aktualisIndex   = r.xbolMaradek;
    aktualisSokasag = r.SokasagbolMaradek;
    kisIndexek.push(r.hanyadikba);
  }
  return kisIndexek;
}

function sokasagNCentilisebeEsikX(sokasag, n, x) {
  let csoportHossza = sokasag / n;
  for (let i = 1; i <= n; i++) {
    if (csoportHossza * i >= x) {
      return { hanyadikba: i, SokasagbolMaradek: csoportHossza, xbolMaradek: x - csoportHossza * (i - 1) };
    }
  }
}

function KisIndexbolInsertS(index,array,szabaly){
  let hova12 = kisIndexbolHovaInsert(index,array.length+1)
  // console.log(hova12)
  insert(array,szabaly[0],szabaly[1],hova12[0],hova12[1])
}

function insert(ebbe, ezt, megezt, ide, megide) {
  ebbe.splice(megide, 0, megezt);
  ebbe.splice(ide, 0, ezt);
  // return ebbe;
}

function kisIndexbolHovaInsert(index, n) { //
  let b = 0;
  elsoInsert = function (csoportHossza, csoportUtolsoIndexe) {
    if (index > csoportUtolsoIndexe) {
      csoportHossza--;
      return elsoInsert(csoportHossza, csoportUtolsoIndexe + csoportHossza) + 1
    } else {
      b=n-(csoportUtolsoIndexe-index)-1
      return 0
    }
  }
  return [elsoInsert(n, n), b];
}

