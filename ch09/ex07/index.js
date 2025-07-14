export class LinkedList {
  #head = null;
  #tail = null;

  push(value) {
    const newNode = { value, next: null };
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      this.#tail = newNode;
    }
  }

  pushAll(...items) {
    items.forEach((item) => this.push(item));
  }

  toString() {
    let current = this.#head;
    const values = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return "[" + values.join(", ") + "]";
  }
}

export class InstrumentedLinkedList {
  #list = new LinkedList();
  #pushCount = 0;

  get pushCount() {
    return this.#pushCount;
  }

  push(item) {
    this.#list.push(item);
    this.#pushCount++;
  }

  pushAll(...items) {
    items.forEach((item) => this.push(item)); // pushAllではなく、push を使う
  }
}