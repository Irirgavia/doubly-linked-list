const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        let node;
        if (this.isEmpty()) {
            node = new Node(data);
            this._head = node;
            this._tail = node;
        }
        else {
            node = new Node(data, this._tail)
            this._tail.next = node;
            this._tail = node;
        }
        this.length += 1;
        return this;
    }

    head() {
        if (!this.isEmpty()) return this._head.data;
        return null;
    }

    tail() {
        if (!this.isEmpty()) return this._tail.data;
        return null;
    }

    at(index) {
        if (index < 0 || index > this.length) return null;
        let currentNode = this._head;
        for (let i = 0; i < this.length; i++) {
            if (i == index) return currentNode.data;
            currentNode = currentNode.next;
        }
    }

    insertAt(index, data) {
        let newNode = new Node(data);
        switch (index) {
            case 0:
                if (this.length == 0) {
                    this.append(data);
                }
                else {
                    newNode.prev = null;
                    newNode.next = this._head;
                    this._head.prev = newNode;
                    this._head = newNode;
                }

                break;
            default:
                let currentNode = this._head;
                for (let i = 1; i < this.length; i++) {
                    currentNode = currentNode.next;
                    if (i == index) {
                        newNode.prev = currentNode.prev;
                        newNode.next = currentNode;
                        newNode.prev.next = newNode;
                        currentNode.prev = newNode;
                        break;
                    }
                }
                break;
        }
        this.length++;
        return this;
    }

    isEmpty() {
        if (this.length == 0) return true;
        return false;
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }

    deleteAt(index) {
        switch (index) {
            case 0:
                this._head = this._head.next;
                break;
            case this.length - 1:
                this._tail.prev.next = null;
                this._tail = null;
                break;
            default:
                let currentNode = this._head;
                for (let i = 1; i < this.length - 1; i++) {
                    currentNode = currentNode.next;
                    if (i == index) {
                        currentNode.prev.next = currentNode.next;
                        currentNode.next.prev = currentNode.prev;
                        break;
                    }
                }

        }
        this.length--;
        return this;
    }

    reverse() {
        let currentNode = this._head;
        let prevNode = null;
        this._head = this._tail;
        this._tail = currentNode;
        for (let i = 0; i < this.length; i++) {
            let nextNode = currentNode.next;
            currentNode.prev = nextNode;
            currentNode.next = prevNode;
            prevNode = currentNode;

            currentNode = nextNode;
        }
        return this;
    }


    indexOf(data) {
        let currentNode = this._head;
        for (let i = 0; i < this.length; i++) {
            if (currentNode.data == data) return i;
            currentNode = currentNode.next;
        }
        return -1;
    }
}

module.exports = LinkedList;
