//Variáveis de posição e tamanho da Bolinha:
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//Variáveis de movimento da Bolinha
let velXBolinha = 6;
let velYBolinha = 6;

//Variáveis da Raquete
let xRaq = 5;
let yRaq = 150;
let compRaq = 10;
let altRaq = 90;

//Variáveis Oponente
let xOp = 585
let yOp = 150;
let velOp;

//Placar do jogo
let meusPontos = 0;
let pontosOp = 0;

//Sons do jogo
let ponto;
let raquetada;
let trilha;

let chanceErro = 0;

let colidiu = false;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  moveBola();
  attBorda();
  mostraRaq(xRaq, yRaq);
  mostraRaq(xOp, yOp);
  movRaq();
  movOp();
  //multiplayer();
  colisaoMinhaRaq();
  colisaoRaqOp();
  placar();
  pontuar();
  //errar();
  tiraBug();
  //colideBiblio();
  //colideBiblio2();
  //colisaoRaqs(xRaq, yRaq);
  //colisaoRaqs(xOp, yOp);


}

function mostraBola(){
  circle(xBolinha,yBolinha,diametro)
}

function moveBola(){
  xBolinha += velXBolinha
  yBolinha += velYBolinha
}

function attBorda(){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0) {
    velXBolinha *= -1
    ponto.play();
  }
  if (yBolinha + raio > height ||
    yBolinha - raio < 0) {
    velYBolinha *= -1
  }
}

function mostraRaq(x,y){
  rect(x, y, compRaq, altRaq);
}

function movOp(){
  velOp = yBolinha - yOp - compRaq/2 - 30;
  yOp += velOp / 10
  //yOp += velOp + chanceErro
  //errar()
}

function errar(){
  if (pontosOp >= meusPontos){
    chanceErro += 1
    if (chanceErro >= 39) {
      chanceErro = 40
    }
  } else {
    chanceErro -= 1
    if (chanceErro <= 35){
      chanceErro = 35
    }
  }
}

function movRaq(){
  if (keyIsDown(DOWN_ARROW)){
    yRaq += 10;
  }
  if (keyIsDown(UP_ARROW)){
    yRaq -= 10;
  }
}

function multiplayer(){
   if (keyIsDown(83)){
    yOp += 10;
  }
  if (keyIsDown(87)){
    yOp -= 10;
  }
}

function colisaoMinhaRaq(){
  if (xBolinha - raio < xRaq + compRaq && yBolinha + raio > yRaq && yBolinha - raio < yRaq + altRaq) {
    velXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaqOp(){
  if (xBolinha + raio > xOp && yBolinha + raio > yOp && yBolinha - raio < yOp + altRaq) {
    velXBolinha *= -1;
    raquetada.play();
  }
}


function colideBiblio(xRaq, yRaq, compRaq, altRaq, xBolinha, yBolinha, raio){
  colidiu = collideRectCircle(xRaq, yRaq, compRaq, altRaq, xBolinha, yBolinha, raio);
  if (colidiu){
    velXBolinha *= -1;
  }
}

function colideBiblio2(xOp, yOp, compRaq, altRaq, xBolinha, yBolinha, raio){
 colidiu = collideRectCircle(xOp, yOp, compRaq, altRaq, xBolinha, yBolinha, raio);
  if (colidiu){
    velXBolinha *= -1;
  }
}

function colisaoRaqs(x, y, compRaq, altRaq, xBolinha, yBolinha, raio){
  colidiu = collideRectCircle(x, y, compRaq, altRaq, xBolinha, yBolinha, raio);
  if (colidiu){
    velXBolinha *= -1;
  }
}

function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  textStyle(BOLD);
  fill(color(0, 206, 209));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(0, 206, 209));
  rect(410, 10, 40, 20);
  fill(255);
  text(pontosOp, 430, 26);
}

function pontuar(){
  if (xBolinha > 590){
    meusPontos += 1;
  }
  if (xBolinha < 10){
    pontosOp += 1;
  }
}

function tiraBug(){
  if (xBolinha < 0){
    xBolinha = 23;
  }
}