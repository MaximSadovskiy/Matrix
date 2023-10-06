var Matrix = /** @class */ (function () {
    function Matrix(parentId, bodyId) {
        if (bodyId === void 0) { bodyId = "body"; }
        var parentTemp = document.getElementById(parentId);
        if (parentTemp) {
            Matrix.parentElement = parentTemp;
        }
        else
            console.error("Wrong parent id!");
        var bodyTemp = document.getElementById(bodyId);
        if (bodyTemp) {
            Matrix.bodyElement = bodyTemp;
        }
        else
            console.error("Wrong body id!");
    }
    Matrix.prototype.start = function () {
        window.addEventListener("resize", Matrix.updateBlocks);
        window.addEventListener("keyup", Matrix.keyEvent);
        Matrix.updateBlocks();
    };
    Matrix.prototype.stop = function () {
        window.removeEventListener("resize", Matrix.updateBlocks);
        window.removeEventListener("keyup", Matrix.keyEvent);
        Matrix.clearBlocks();
    };
    Matrix.update = function () {
        Matrix.clearBlocks();
        Matrix.updateBlocks();
    };
    Matrix.updateBlocks = function () {
        if (!Matrix.bodyElement) {
            console.error("Error: <body> is null!");
            return;
        }
        if (!Matrix.parentElement) {
            console.error("Error: parent is null!");
            return;
        }
        //fix magic val
        var tempSize = Math.floor(Matrix.bodyElement.clientWidth / 36);
        Matrix.clearBlocks();
        //How much blocks add
        if (Matrix.blocksSize <= 0)
            Matrix.blocksSize = tempSize;
        else if (Matrix.blocksSize < tempSize)
            Matrix.blocksSize += tempSize - Matrix.blocksSize;
        else if (Matrix.blocksSize > tempSize)
            Matrix.blocksSize -= Matrix.blocksSize - tempSize;
        //Append blocks to parentElement
        for (var i = 1; i <= Matrix.blocksSize; ++i) {
            var text = Matrix.hackerMode
                ? Matrix.textArr[Util.getRandomInt(0, Matrix.textArr.length - 1)]
                : Util.generateText(Util.getRandomInt(3, 10));
            var attribs = new ElementAttr("div", text, Matrix.blockClassName, Matrix.blockId);
            Util.appendElementToTheParent(attribs, Matrix.parentElement);
        }
    };
    Matrix.clearBlocks = function () {
        if (!Matrix.parentElement)
            return;
        while (Matrix.parentElement.firstChild != null) {
            Matrix.parentElement.removeChild(Matrix.parentElement.firstChild);
        }
    };
    Matrix.keyEvent = function (event) {
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
    };
    Matrix.textArr = [
        "xor eax, eax", "add eax, 433", "push rbp",
        "hack.exe", "new( )", "1337", "float f = 3.14f",
        "std::cout <<", "static", "template<typename T>",
        "string", "&element", "app.start", "mov dword ptr",
        "for (int i = 0)", "function", "main", "void", "int",
        "void* mem", "0x00FFBAEC5621", "0x000CCFEC251", "010111001110",
    ];
    Matrix.hackerMode = true;
    Matrix.blocksSize = 0;
    Matrix.blockClassName = "block";
    Matrix.blockId = "block";
    return Matrix;
}());
var ElementAttr = /** @class */ (function () {
    function ElementAttr(tagName, text, className, id) {
        this.tagName = "div";
        this.text = undefined;
        this.className = undefined;
        this.id = undefined;
        this.tagName = tagName;
        this.text = text;
        this.className = className;
        this.id = id;
    }
    return ElementAttr;
}());
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.generateText = function (length) {
        if (length < 1)
            return "xdxdxdxdxd";
        var text = "";
        for (var i = 0; i <= length; ++i) {
            var number = Util.getRandomInt(48, 125);
            //Increase change to get symbol instead of letter
            if (number > 63 || number < 97)
                number = Util.getRandomInt(48, 125);
            text += String.fromCharCode(number);
        }
        return text;
    };
    Util.getRandomInt = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };
    Util.updateSpeed = function () {
        console.log("to be continued...");
        //const anim = "slideAnim " + Util.getRandomInt(6, 13) + "s linear infinite";
        //elementsArr.forEach((elem) => (elem.style.animation = anim));
    };
    Util.appendElementToTheParent = function (attribs, parent) {
        var elem = document.createElement(attribs.tagName, undefined);
        if (attribs.text)
            elem.innerText = attribs.text;
        if (attribs.id)
            elem.id = attribs.id;
        if (attribs.className)
            elem.classList.add(attribs.className);
        var anim = "slideAnim " + Util.getRandomInt(5, 14) + "s linear infinite";
        var colorId = Util.getRandomInt(0, Util.colorArr.length);
        var color = Util.colorArr[colorId];
        elem.style.animation = anim;
        elem.style.color = color;
        parent.appendChild(elem);
    };
    Util.parentId = "screen";
    Util.bodyId = "body";
    Util.colorArr = [
        "#4a750b", // dark green
        "#7fd302", // light green
    ];
    return Util;
}());
var matrix = new Matrix(Util.parentId, Util.bodyId);
matrix.start();
//setTimeout(() => {matrix.stop(); alert("Matrix has stoped")}, 20000);
