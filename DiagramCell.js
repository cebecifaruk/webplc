class DiagramCell extends HTMLElement {
  selected = false;
  constructor(prnt, data, i, j) {
    super();

    this.j = j;

    this.id = i.toString() + "-" + j.toString();

    this.value = data;

    this.onclick = function() {
      prnt.changeSelected(i, j);
    };

    this.ondblclick = function() {
      console.log("dene");
      prnt.data[i][j-1] = prompt(self.data[i][j-1]);
      prnt.updateCurrent();
    };

    this.addEventListener("contextmenu", e => {
      var cm = document.getElementById("contextMenu1");
      cm.style.display = "block";
      cm.style.top = String(e.clientY) + "px";
      cm.style.left = String(e.clientX) + "px";
      prnt.changeSelected(i,j);
      e.preventDefault();
    });

    this.selected = true;
  }

  set value(data) {
    var num = data;
    var j = this.j;

    if (typeof num != "string") alert("Not a string !!!" + num);

    var grup2 = `<svg viewBox="0 0 100 100" class="box" preserveAspectRatio="none">`;
    var ss = " ";
    switch (num) {
      case 40:
        ss =
          grup2 +
          `<line x1="0" y1="50" x2="100" y2="50" />
        </svg>`;
        break;
      case 41:
        ss = grup2 + `<line x1="0" y1="50" x2="100" y2="50" /></svg>`;
        break;

      case "0":
        ss = grup2 + `</svg>`;
        break;
      case "1":
        ss =
          grup2 +
          `    <line x1="50" y1="0" x2="50" y2="100" stroke-dasharray="5 5"/>
                      <line x1="0" y1="50" x2="100" y2="50" stroke-dasharray="5 5"/>
                  </svg>`;
        if (j % 2 == 1)
          ss =
            grup2 +
            `<line x1="0" y1="50" x2="25" y2="50" stroke-dasharray="5 5"/>
                  <line x1="75" y1="50" x2="100" y2="50"stroke-dasharray="5 5"/>
                  <rect x=25 y=38 width="50" height="24" />
              </svg>`;

        if (j == 11)
          ss =
            grup2 +
            `<line x1="0" y1="50" x2="25" y2="50" />
      <line x1="75" y1="50" x2="100" y2="50"  />  
      <path d="M 40 0 C 20 20, 20 80, 40 100"/>
      <path d="M 60 0 C 80 20, 80 80, 60 100"/>
      </svg>`;
        break;
      case "2":
        ss =
          grup2 +
          `<line x1="0" y1="50" x2="100" y2="50" stroke="black";/></svg>`;
        if (j % 2 == 1)
          ss =
            grup2 +
            `<line x1="0" y1="50" x2="100" y2="50" stroke="black";/></svg>`;
        break;

      case "3":
        ss =
          grup2 +
          ` <line x1="0" y1="50" x2="100" y2="50" stroke="black";/>
                   <line x1="50" y1="50" x2="50" y2="100" stroke="black";/>
              </svg>`;
        break;
      case "4":
        ss =
          grup2 +
          `<line x1="0" y1="50" x2="100" y2="50" stroke="black";/>
              <line x1="50" y1="0" x2="50" y2="50"  stroke="black";/> 
          </svg>`;
        break;
      case "5":
        ss =
          grup2 +
          `<line x1="50" y1="0" x2="50" y2="100" stroke="black";/>
          <line x1="50" y1="50" x2="100" y2="50" stroke="black";/>
      </svg>`;

        break;

      case "6":
        ss =
          grup2 +
          `<line x1="50" y1="0" x2="50" y2="100" stroke="black";/>
                  <line x1="0" y1="50" x2="50" y2="50" stroke="black";/>
              </svg>`;
        break;

      case "7":
        ss =
          grup2 +
          `<line x1="50" y1="0" x2="50" y2="100" stroke="black";/>
                  </svg>`;
        break;
      case "8":
        ss =
          grup2 +
          `<line x1="0" y1="50" x2="100" y2="50" stroke="black";/>
                      <line x1="50" y1="0" x2="50" y2="100" stroke="black";/>
                  </svg>`;
        break;
      case "9":
        ss =
          grup2 +
          `<line x1="50" y1="50" x2="50" y2="100" stroke="black";/>
              <line x1="0" y1="50" x2="50" y2="50" stroke="black";/>
          </svg>`;
        break;

      case "10":
        ss =
          grup2 +
          `<line x1="50" y1="50" x2="50" y2="100" stroke="black";/>
          <line x1="50" y1="50" x2="100" y2="50" stroke="black";/>
      </svg>`;
        break;

      case "11":
        ss =
          grup2 +
          `<line x1="0" y1="50" x2="50" y2="50" stroke="black";/>
              <line x1="50" y1="0" x2="50" y2="50" stroke="black";/>
          </svg>`;
        break;

      case "12":
        ss =
          grup2 +
          `<line x1="50" y1="0" x2="50" y2="50" stroke="black";/>
                  <line x1="50" y1="50" x2="100" y2="50" stroke="black";/>
            </svg>`;

        break;

      default:
        ss =
          grup2 +
          `<line x1="0" y1="50" x2="33" y2="50" stroke="black";/>
                  <line x1="66" y1="50" x2="100" y2="50" stroke="black";/>  
                  <line x1="33" y1="20" x2="33" y2="80" stroke="black";/>
                  <line x1="66" y1="20" x2="66" y2="80" stroke="black";/>
                  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="txt">${num}</text>
              </svg>`;
        if (j == 11)
          ss =
            grup2 +
            `<line x1="0" y1="50" x2="25" y2="50" stroke="black";/>
      <line x1="75" y1="50" x2="100" y2="50" stroke="black";/>  
      <path d="M 40 0 C 20 20, 20 80, 40 100" stroke="black";/>
      <path d="M 60 0 C 80 20, 80 80, 60 100" stroke="black";/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="txt">${num}</text>
  </svg>`;
        break;
    }

    this.innerHTML = ss;
  }

  set selected(val) {
    // TODO:NOT WORKING
  }

  setSelected(val) {
    if (val) this.childNodes[0].style.backgroundColor = "yellow";
    else this.style.backgroundColor = "#F0F0F0";
  }

  setValue(val) {
    this.value = val;
  }
}

customElements.define("diagram-cell", DiagramCell);
