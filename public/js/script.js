var inputSKS = 0;
var nilaiAkhir = 0;
var bobotIndeks = 0;
var nilaiIndeks = "K";
function updateSKS(vals){ 
  inputSKS = vals;
  hitungNilai();
}
function updateIndeks(valz){
  nilaiIndeks = valz;
  hitungNilai();
}
function hitungNilai(){
  if (nilaiIndeks.toLowerCase() == "a") {
    bobotIndeks = 4;
    nilaiAkhir = inputSKS * bobotIndeks;
  }   
  else if (nilaiIndeks.toLowerCase() == "b+") {
    bobotIndeks = 3.5;
    nilaiAkhir = inputSKS * bobotIndeks;
  }
  else if (nilaiIndeks.toLowerCase() == "b") {
    bobotIndeks = 3;
    nilaiAkhir = inputSKS * bobotIndeks;
  }
  else if (nilaiIndeks.toLowerCase() == "c+") {
    bobotIndeks = 2.5;
    nilaiAkhir = inputSKS * bobotIndeks;
  }
  else if (nilaiIndeks.toLowerCase() == "c") {
    bobotIndeks = 2;
    nilaiAkhir = inputSKS * bobotIndeks;
  }
  else if (nilaiIndeks.toLowerCase() == "d+") {
    bobotIndeks = 1.5;
    nilaiAkhir = inputSKS * bobotIndeks;
  }
  else if (nilaiIndeks.toLowerCase() == "d") {
    bobotIndeks = 1;
    nilaiAkhir = inputSKS * bobotIndeks;
  }
  else {
    bobotIndeks = 0;
    nilaiAkhir = inputSKS * bobotIndeks;
  }    
  document.getElementById("hasilIndeks").value = bobotIndeks;
  document.getElementById("hasilAkhir").value = nilaiAkhir;
}