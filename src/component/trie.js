export class Node {
  constructor(value, children) {
    this.value = value;
    this.children = children;
  }
}

export class Trie {
  constructor(words) {
    this.head = new Node("", {});
    for (let i = 0; i < words.length; i++) {
      this.add(words[i]);
    }
  }

  add(word) {
    let pointer = this.head;
    for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      if (!pointer.children[letter]) {
        pointer.children[letter] = new Node(letter, {});
      }
      pointer = pointer.children[letter];
    }
  }

  find(word) {
    let results = [];
    let pointer = this.head;

    for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      if (!pointer.children[letter]) {
        return results;
      }
      pointer = pointer.children[letter];
    }

    let traverse = (node, substring) => {
      let letters = Object.keys(node.children);

      if (letters.length === 0) {
        results.push(substring);
        return;
      }

      for (let i = 0; i < letters.length; i++) {
        traverse(node.children[letters[i]], substring + letters[i]);
      }
    };

    traverse(pointer, word);

    return results.slice(0, 10);
  }
}
