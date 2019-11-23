// Notlar
// Kesinlikle kopyala yapistirdan kurtulunmasi gerekiyor
// Fonksiyonlar daha fazla kullanilmali
// idleri asla kullanma onun yerine array olarak depola
// bir kodu kopyala yapistir yapiyorsan orada mutlaka bir fonksiyon vardir
// global degisken kullanmak yasak ayni sekilde global fonksiyonlardanda olabildigince kacinilacak
// kopyala yapistir olmayacak asla ve asla ne klasor ve dosyalarda nede dosyalarin icinde kodda
// yazdigin bir fonksiyon 1 veya 0 kez cagiriliyor ise o fonksiyonu cagirdigin yere gommek daha mantikli
// tek satirlik fonksiyonlar icin lambda notasyonu lunnailabilir
// Get rid of current

class Editor {
  data = [["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]];
  elements = [];
  selected = [-1, -1];

  constructor() {
    this.data = [
      ["2", "2", "2", "2", "42", "3", "2", "2", "2", "2", "61"],
      ["2", "2", "2", "2", "42", "6", "1", "1", "1", "1", "1"],
      ["2", "2", "2", "2", "42", "11", "1", "1", "1", "1", "1"],
      ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
    ];

    var root = document.createElement("div");
    root.classList.add("container-fluid");

    var i;
    for (i = 0; i < this.data.length; i++) {
      var number = i + 1;
      var el = this.data[i];

      var r = document.createElement("div");
      r.classList.add("row");
      r.innerHTML = `<div id="headerLine" style=" height: 49px; line-height: 49px; width: 40px; color: #000000; text-align: center;
          border: 1px white solid;background: gray">${number}</div>`;
      var j;
      for (j = 0; j < el.length; j++)
        r.appendChild(new DiagramCell(this, el[j], i, j));
      root.appendChild(r);
    }

    this.addKeys();
    document.body.appendChild(root);

    this.createContextMenu();

    this.changeSelected(this.selected[0], this.selected[1]);
  }

  createContextMenu() {
    // context menu

    var cm = document.createElement("div");
    cm.id = "contextMenu1";
    cm.classList.add("contextmenu");
    cm.addEventListener("contextmenu", e => {
      e.preventDefault();
    });

    cm.innerHTML = `
        <div class="container">
            <div class="row contextmenuitem">Inverter</div>
            <div class="row contextmenuitem">Baglanti</div>
            <div class="row contextmenuitem">DIn</div>
            <div class="row contextmenuitem">DInFlt</div>
            <div class="row contextmenuitem">DQ</div>
            <div class="row contextmenuitem">Aux</div>
            <div class="row contextmenuitem">Tmr</div>
            <div class="row contextmenuitem">Cnt</div>
            <div class="row contextmenuitem">CntCmp</div>
            <div class="row contextmenuitem">FstCnt</div>
            <div class="row contextmenuitem">SmAQ</div>
            <div class="row contextmenuitem">SmBQ</div>
            <div class="row contextmenuitem">Key</div>
            <div class="row contextmenuitem">KeyFlt</div>
            <div class="row contextmenuitem">AnCmp</div>
            <div class="row contextmenuitem">Pswd</div>
            <div class="row contextmenuitem">CfgFlg</div>
            <div class="row contextmenuitem">RTCWA</div>
            <div class="row contextmenuitem">RTCYA</div>
            <div class="row contextmenuitem">NetIn</div>
            <div class="row contextmenuitem">Sys</div>
            <div class="row contextmenuitem">----</div>
            <div class="row contextmenuitem">NO</div>
            <div class="row contextmenuitem">NC</div>
            <div class="row contextmenuitem">FTRIG</div>
            <div class="row contextmenuitem">RTRIG</div>
            <div class="row contextmenuitem">----</div>
            <div class="row contextmenuitem">Kontak Sil</div>
            <div class="row contextmenuitem">Satir Ekle</div>
            <div class="row contextmenuitem">Satir Sil</div>
        </div>`;
    document.body.appendChild(cm);
    this.cm = cm;
  }

  removeCurrentBoxValue() {
    this.data[this.selected[0]][this.selected[1]] =
      this.selected[1] != 11 ? "1" : "60";
    this.updateCurrent();
  }

  updateBox(i, j) {
    if (i < 0 || j < 0) return null;
    var el = document.getElementById(i.toString() + "-" + j.toString());
    el.setValue(this.data[i][j]);
    el.setSelected(true);
  }

  updateCurrent() {
    this.updateBox(this.selected[0], this.selected[1]);
  }

  changeCurrentValue(str) {
    if (str == undefined)
      str = last_yelow + " : " + self.data[this.selected[0]][this.selected[1]];
    self.data[this.selected[0]][this.selected[1]] = prompt(str);
    self.updateCurrent();
  }

  changeSelected(i, j) {
    if (i < 0 || i >= this.data.length || j < 0 || j >= this.data[0].length) {
      if (i == -1 && j == -1);
      else return null;
    }

    var backup = this.selected;
    this.selected = [i, j];
    this.updateBox(backup[0], backup[1]);
    this.updateBox(i, j);
  }

  addKeys() {
    var self = this;
    document.addEventListener("keydown", function(event) {
      const key = event.key; // const {key} = event; ES6+
      //if ((this.selected[0] == 0) & (this.selected[1] == 0)) return;

      switch (key) {
        case "Delete":
          self.removeCurrentBoxValue();
          break;
        case "ArrowUp":
          self.changeSelected(self.selected[0] - 1, self.selected[1]);
          break;

        case "ArrowDown":
          self.changeSelected(self.selected[0] + 1, self.selected[1]);
          break;
        case "ArrowRight":
          self.changeSelected(self.selected[0], self.selected[1] + 1);
          break;

        case "ArrowLeft":
          self.changeSelected(self.selected[0], self.selected[1] - 1);
          break;

        case "Enter":
          self.changeCurrentValue();
          break;

        case "Escape":
          if (document.getElementById("contextMenu1").style.display != "none") {
            document.getElementById("contextMenu1").style.display = "none";
          } else self.changeSelected(-1, -1);

          break;
        case "Shift":
          this.data[this.selected[0]][this.selected[1]] = "2";
          this.updateCurrent();
          break;
      }
    });
  }

  toString() {
    var nw = this.data.map(a => a.map(b => String(b)));
    var u = nw.map(a => '["' + a.join('","') + '"]');
    console.log(u);
  }

  compile() {
    var result = document.createElement("div");
    var u = parseLadder(this.data);
    result.innerText = u.generateProgram("test");
    document.body.appendChild(result);
  }
}

editor = new Editor();
