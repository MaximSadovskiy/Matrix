class Matrix {
  public static textArr: string[] = [
    "xor eax, eax", "add eax, 433", "push rbp",
    "hack.exe", "new( )", "1337", "float f = 3.14f",
    "std::cout <<", "static", "template<typename T>",
    "string", "&element", "app.start", "mov dword ptr",
    "for (int i = 0)", "function", "main", "void", "int",
    "void* mem", "0x00FFBAEC5621", "0x000CCFEC251", "010111001110",
  ];
  public static hackerMode: boolean = true;
  private static parentElement: HTMLElement;
  private static bodyElement: HTMLElement;
  private static blocksSize: number = 0;
  private static blockClassName: string = "block";
  private static blockId: string = "block";

  public constructor(parentId: string, bodyId: string = "body") {
    let parentTemp = document.getElementById(parentId);
    if (parentTemp) {
      Matrix.parentElement = parentTemp;
    } else console.error("Wrong parent id!");

    let bodyTemp = document.getElementById(bodyId);
    if (bodyTemp) {
      Matrix.bodyElement = bodyTemp;
    } else console.error("Wrong body id!");
  }
  public start(): void {
    window.addEventListener("resize", Matrix.updateBlocks);
    window.addEventListener("keyup", Matrix.keyEvent);
    Matrix.updateBlocks();
  }
  public stop(): void {
    window.removeEventListener("resize", Matrix.updateBlocks);
    window.removeEventListener("keyup", Matrix.keyEvent);
    Matrix.clearBlocks();
  }
  public static update(): void {
    Matrix.clearBlocks();
    Matrix.updateBlocks();
  }
  private static updateBlocks() {
    if (!Matrix.bodyElement) {
      console.error("Error: <body> is null!");
      return;
    }
    if (!Matrix.parentElement) {
      console.error("Error: parent is null!");
      return;
    }

    //fix magic val
    const tempSize = Math.floor(Matrix.bodyElement.clientWidth / 36);

    Matrix.clearBlocks();

    //How much blocks add
    if (Matrix.blocksSize <= 0) Matrix.blocksSize = tempSize;
    else if (Matrix.blocksSize < tempSize)
      Matrix.blocksSize += tempSize - Matrix.blocksSize;
    else if (Matrix.blocksSize > tempSize)
      Matrix.blocksSize -= Matrix.blocksSize - tempSize;

    //Append blocks to parentElement
    for (let i = 1; i <= Matrix.blocksSize; ++i) {
      const text = Matrix.hackerMode
        ? Matrix.textArr[Util.getRandomInt(0, Matrix.textArr.length - 1)]
        : Util.generateText(Util.getRandomInt(3, 10));

      const attribs = new ElementAttr(
        "div",
        text,
        Matrix.blockClassName,
        Matrix.blockId
      );
      Util.appendElementToTheParent(attribs, Matrix.parentElement);
    }
  }
  private static clearBlocks() {
    if (!Matrix.parentElement) return;
    while (Matrix.parentElement.firstChild != null) {
      Matrix.parentElement.removeChild(Matrix.parentElement.firstChild);
    }
  }
  private static keyEvent(event) {
    //Клавиша "1"
    if (event.keyCode === 49) {
      Matrix.hackerMode = true;
      Matrix.update();
    }
    //Клавиша "2"
    else if (event.keyCode === 50) {
      Matrix.hackerMode = false;
      Matrix.update();
    }
  }
}
class ElementAttr {
  tagName: string = "div";
  text: string | undefined = undefined;
  className: string | undefined = undefined;
  id: string | undefined = undefined;

  constructor(
    tagName: string,
    text: string | undefined,
    className: string | undefined,
    id: string | undefined
  ) {
    this.tagName = tagName;
    this.text = text;
    this.className = className;
    this.id = id;
  }
}
class Util {
  public static parentId = "screen";
  public static bodyId = "body";
  private static colorArr = [
    "#4a750b", // dark green
    "#7fd302", // light green
  ];

  public static generateText(length: number): string {
    if (length < 1) return "xdxdxdxdxd";
    let text = "";
    for (let i = 0; i <= length; ++i) {
      let number = Util.getRandomInt(48, 125);
      //Increase change to get symbol instead of letter
      if (number > 63 || number < 97) number = Util.getRandomInt(48, 125);
      text += String.fromCharCode(number);
    }
    return text;
  }
  public static getRandomInt(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
  public static updateSpeed(): void {
    console.log("to be continued...");
    //const anim = "slideAnim " + Util.getRandomInt(6, 13) + "s linear infinite";
    //elementsArr.forEach((elem) => (elem.style.animation = anim));
  }
  public static appendElementToTheParent(
    attribs: ElementAttr,
    parent: HTMLElement
  ) {
    const elem = document.createElement(attribs.tagName, undefined);

    if (attribs.text) elem.innerText = attribs.text;
    if (attribs.id) elem.id = attribs.id;
    if (attribs.className) elem.classList.add(attribs.className);

    const anim = "slideAnim " + Util.getRandomInt(5, 14) + "s linear infinite";
    const colorId = Util.getRandomInt(0, Util.colorArr.length);
    const color = Util.colorArr[colorId];
    elem.style.animation = anim;
    elem.style.color = color;

    parent.appendChild(elem);
  }
}

const matrix = new Matrix(Util.parentId, Util.bodyId);
matrix.start();

//setTimeout(() => {matrix.stop(); alert("Matrix has stoped")}, 20000);
