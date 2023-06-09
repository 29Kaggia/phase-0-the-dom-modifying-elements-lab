const { JSDOM } = require('jsdom');
const { expect } = require('chai');


const indexHTML = fs.readFileSync('./index.html', 'utf-8');


const dom = new JSDOM(indexHTML);
global.document = dom.window.document;

require('./index.js');

describe("index.html", () => {
  describe("after index.js is processed", () => {
    it("no longer has DOM node 'main#main'", () => {
      const mainElement = document.querySelector('main#main');
      expect(mainElement, "Make sure you remove the <main> with id 'main'").to.not.exist;
    });

    it("has a 'newHeader' variable that points to an <h1> node", () => {
      const newHeader = document.querySelector('h1#victory');
      expect(newHeader, "Make sure you create an <h1> and assign it to the 'newHeader' variable").to.exist;
      expect(newHeader.nodeName, "Make sure you create an <h1> and assign it to the 'newHeader' variable").to.equal("H1");
    });

    it("the 'newHeader' variable that points to the <h1> node has an id of 'victory'", () => {
      const newHeader = document.querySelector('h1#victory');
      expect(newHeader.id, "Make sure the id of your <h1> is set to 'victory'").to.equal("victory");
    });

    it("the 'newHeader' variable that points to the <h1> node with an id of 'victory' has the text \"YOUR-NAME is the champion\" (with your name in place of YOUR-NAME) inside it", () => {
      const newHeader = document.querySelector('h1#victory');
      expect(newHeader.innerHTML, "Make sure your <h1> with id 'victory' includes the text \"is the champion\" inside it").to.include("is the champion");
    });
  });
});
