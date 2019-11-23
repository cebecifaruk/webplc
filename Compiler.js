class Graph {
  constructor() {
    this.nodes = []; //nodes as vars
    this.edges = [];
  }

  addNode = node => {
    if (!this.nodes.includes(node)) this.nodes.push(node);
  };
  addEdge = (name, n1, n2) => {
    this.edges.push([name, n1, n2]);
    this.addNode(n1);
    this.addNode(n2);
  };
  getEdgesFrom = node => this.edges.filter(a => a[1] == node);
  getEdgesTo = node => this.edges.filter(a => a[2] == node);
  getEdges = (from, to) =>
    this.edges.filter(a => a[1] == from && a[2] == to).map(l => l[0]);
  getNodesOutNeighbors = node =>
    this.getEdgesFrom(node).reduce((b, a) => {
      if (!b.includes(a[2])) b.push(a[2]);
      return b;
    }, []);

  // removeEdge
  // removeNode
  // contains
  //hasEdge
  //forEachNode

  print() {
    console.log(this.nodes);
    console.log(this.edges);
  }

  generateProgram(name) {
    // Simplfy the graph

    var result = [];
    this.nodes.forEach(a =>
      this.nodes.forEach(b => {
        if (this.getEdges(a, b).length > 0)
          result.push(["(" + this.getEdges(a, b).join(") OR (") + ")", a, b]);
      })
    );
    this.edges = result;

    this.print();

    var code = "";
    this.getEdgesFrom(1).forEach(a => {
      code = code + "\nLCL_" + a[2] + " :=" + a[0] + ";";
    });

    return `PROGRAM ${name}\nVAR;\n${"LCL_" +
      this.nodes.join(":BOOL;\nLCL_") +
      ":BOOL;"}\nEND_VAR\n${code}\nEND_PROGRAM`;
  }
}

var last = 0;
getNewNode = () => ++last;

deneme = str => str.match(/^[0-9]+$/) != null;
var yap = false;

function getBox(box, left, top, bottom) {
  if (typeof box == "number") return box;
  switch (box) {
    case "1":
      return 0;

    case "─":
    case "\u2500":
    case "2":
      if (left != undefined && typeof left == "number") return left;
      return box;

    case "┬":
    case "\u252C":
    case "3":
      if (left != undefined && typeof left == "number") return left;
      else if (bottom != undefined && typeof bottom == "number") return bottom;
      else return box;

    case "┴":
    case "\u2534":
    case "4":
      if (left != undefined && typeof left == "number") return left;
      else if (top != undefined && typeof top == "number") return top;
      else return box;

    case "├":
    case "\u251C":
    case "5":
      if (top != undefined && typeof top == "number") return top;
      else if (bottom != undefined && typeof bottom == "number") return bottom;
      if (yap) return getNewNode();
      else return box;

    case "┤":
    case "\u2524":
    case "6":
      if (left != undefined && typeof left == "number") return left;
      else if (top != undefined && typeof top == "number") return top;
      else if (bottom != undefined && typeof bottom == "number") return bottom;
      if (yap) return getNewNode();
      else return box;

    case "│":
    case "\u2502":
    case "7":
      if (top != undefined && typeof top == "number") return top;
      else if (bottom != undefined && typeof bottom == "number") return bottom;
      if (yap) return getNewNode();
      else return box;

    case "┼":
    case "\u253C":
    case "8":
      if (left != undefined && typeof left == "number") return left;
      else if (top != undefined && typeof top == "number") return top;
      else if (bottom != undefined && typeof bottom == "number") return bottom;
      if (yap) return getNewNode();
      else return box;

    case "┐":
    case "\u2510":
    case "9":
      if (left != undefined && typeof left == "number") return left;
      if (yap) return getNewNode();
      return box;

    case "┌":
    case "\u250C":
    case "10":
      if (buttom != undefined && typeof bottom == "number") return bottom;
      if (yap) return getNewNode();
      else return box;

    case "┘":
    case "\u2518":
    case "11":
      if (left != undefined && typeof left == "number") return left;
      if (yap) return getNewNode();
      else return box;

    case "└":
    case "\u2514":
    case "12":
      if (top != undefined && typeof top == "number") return top;
      else if (yap) return getNewNode();
      else return box;

    default:
      return box;
  }
}

function parseLadder(diagram) {
  var data = diagram;
  var i, j;
  for (i = 0; i < diagram.length; i++)
    switch (data[i][0]) {
      case "1":
        data[i][0] = 0;
        break;
      case "2":
        data[i][0] = 1;
        break;
      default:
        console.log("ERROR");
        return undefined;
    }

  last = 2;

  getCell = (x, y) => {
    if (x < 0 || y < 0 || x >= data.length || y >= data[0].length)
      return undefined;
    return data[x][y];
  };

  for (j = 1; j < diagram[0].length; j++) {
    for (i = 0; i < diagram.length; i++) {
      data[i][j] = getBox(
        getCell(i, j),
        getCell(i, j - 1),
        getCell(i - 1, j),
        getCell(i + 1, j)
      );
    }

    yap = true;
    for (i = diagram.length - 1; i >= 0; i--) {
      data[i][j] = getBox(
        getCell(i, j),
        getCell(i, j - 1),
        getCell(i - 1, j),
        getCell(i + 1, j)
      );
    }
  }

  g = new Graph();
  /*for (i=0;i<diagram.length;i++) {
        for (j=0;j<diagram[0].length;j++) {
            if (typeof(data[i][j])=="number") process.stdout.write(String(data[i][j]));
            else process.stdout.write("\""+String(data[i][j])+"\"");
            process.stdout.write(",");
        }
        process.stdout.write("\n");
    }*/
  for (i = 0; i < data.length; i++) {
    for (j = 0; j < data[0].length - 1; j++) {
      if (typeof data[i][j] == "string")
        g.addEdge(data[i][j], data[i][j - 1], data[i][j + 1]);
    }
  }
  return g;

  g.addNode(1);
}

/*
	// from means starting from 1 and clockwise

	build (x,y,from) {
		if (x == undefined) console.log ("ERRORRRRR");
		if (y == undefined) console.log ("ERRORRRRR");
		if (from == undefined) console.log ("ERRORRRRR");

		if (typeof(this.getCell(x,y)) == "string") {
			if (from == 0) 				
				return (this.getCell(x,y) + " := " + this.build(x,y-1,2));
			
			if (from == 2)
				return "((" + this.getCell(x,y) + ") AND (" + this.build(x,y-1,2) + "))" ;

			else {
				console.log("CONNECTION ERROR");
				return undefined;
			}
		}

		else if (typeof(this.getCell(x,y)) == "number") 	{

			var lst;

			switch(this.getCell(x,y)) {		
				case 2:		lst=[2,4];break;
				case 3:		lst=[2,3,4];break;
				case 4:		lst=[1,2,4];break;
				case 5:		lst=[1,2,3];break;
				case 6:		lst=[1,3,4];break;
				case 7:		lst=[1,3];break;
				case 8: 	lst=[1,2,3,4];break;
				case 9:		lst=[3,4];break;
				case 10:	lst=[2,3];break;
				case 11:	lst=[1,4];break;
				case 12:	lst=[1,2];break;

				case 0: return "TRUE";
		
				default:
					console.log("UNKNOWN CONNECTION OR WRONG CONNECTION");
					return undefined;		
			};

			var index = lst.indexOf(from);
			if (index > -1) {
				lst.splice(index, 1);
			}
			else {
				console.log("CONNECTION ERROR");
				return undefined;
			}

			if (lst.includes(2)) {console.log("ERROR"); return undefined;}

			a=[];
			if (lst.includes(1)) a.push("(" + this.build(x-1,y,3) + ")");
			if (lst.includes(3)) a.push("(" + this.build(x+1,y,1) + ")");
			if (lst.includes(4)) a.push("(" + this.build(x,y-1,2) + ")");


			return lst.reduce((acc, n) => acc + " OR " + n);			
			

		}


	}
	
	compile (x,y,from,expr) {

		if (typeof(this.getCell(x,y)) == "number" && this.getCell(x,y) < 20) 	{

			

			var lst;

			switch(this.getCell(x,y)) {		
				case 2:		lst=[2,4];break;
				case 3:		lst=[2,3,4];break;
				case 4:		lst=[1,2,4];break;
				case 5:		lst=[1,2,3];break;
				case 6:		lst=[1,3,4];break;
				case 7:		lst=[1,3];break;
				case 8: 	lst=[1,2,3,4];break;
				case 9:		lst=[3,4];break;
				case 10:	lst=[2,3];break;
				case 11:	lst=[1,4];break;
				case 12:	lst=[1,2];break;
		
				default:
					console.log("UNKNOWN CONNECTION OR WRONG CONNECTION");		
			};

			var index = lst.indexOf(from);
			if (index > -1) {
				lst.splice(index, 1);
			}
			else console.log("CONNECTION ERROR");


			if (lst.includes(4)) {console.log("ERROR"); return undefined;}

			a=[];
			if (lst.includes(1)) this.compile(x-1,y,3,expr);
			if (lst.includes(3)) this.compile(x+1,y,1,expr);
			if (lst.includes(2)) this.compile(x,y+1,4,expr);


			return this.results;

		}

		else if (typeof(this.getCell(x,y)) == "string") {

			if (this.getCell(x,y+1) == 0) {
				this.results.push (this.getCell(x,y) + " := " + expr);
				return null;
			}
			if(from == 4) this.compile(x,y+1,4,"(" + expr +" AND "+this.getCell(x,y)+")")
			else console.log("CONNECTION ERROR");
		}
			
	
		else console.log("TYPE EROOR");
		return undefined;
	}


	compileWhole () {
		//console.log("PROGRAM main\nVAR\n"+ varList +"\nEND_VAR\n" + a.build(0,10,0) + "\nEND_PROGRAM");

		var arr = [];
		var u;
		for(u=0;u<this.diagram.length;u++) 
			if(this.diagram[u][0] === 2)
				arr.push(u);
		this.compile(0,0,4,"TRUE");
		return "PROGRAM main\nVAR\n"+ varList +"\nEND_VAR\n" + String(this.results) + ";\nEND_PROGRAM";
	}
*/
