'use strict';

console.log('CAMPUS IT SUPPORT REQUEST MANAGER');

// ================================================================
// PART A: STACK
// ================================================================

class Stack {
  constructor() {
    // Create internal storage.
    this.items = [];
  }

  // Add an element to the top.
  push(element) {
    this.items.push(element);
  }

  // Remove and return the top element.
  pop() {
    if (this.isEmpty()) return undefined;
    return this.items.pop();
  }

  // Return the top without removing it.
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.items.length - 1];
  }

  // Check if empty.
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the number of elements.
  size() {
    return this.items.length;
  }

  // Convert elements to text.
  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART A: UNDO HISTORY');

const actionHistory = new Stack();

// Push the required actions.
actionHistory.push('Opened Ticket #101');
actionHistory.push('Assigned Ticket #101');
actionHistory.push('Closed Ticket #101');

// Display and undo the latest action.
console.log('Top Action: ' + actionHistory.peek());
console.log('Undo Action: ' + actionHistory.pop());
console.log('Remaining Actions: ' + actionHistory.toString());
console.log('Stack Size: ' + actionHistory.size());

// ================================================================
// PART B: QUEUE
// ================================================================

class Queue {
  constructor() {
    // Create internal storage.
    this.items = [];
  }

  // Add an element at the back.
  enqueue(element) {
    this.items.push(element);
  }

  // Remove and return the front element.
  dequeue() {
    if (this.isEmpty()) return undefined;
    return this.items.shift();
  }

  // Return the front without removing it.
  front() {
    if (this.isEmpty()) return undefined;
    return this.items[0];
  }

  // Check if empty.
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the number of elements.
  size() {
    return this.items.length;
  }

  // Convert elements to text.
  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART B: WAITING REQUESTS');

const waitingRequests = new Queue();

// Add requests in arrival order.
waitingRequests.enqueue('Ticket #201 - Password Reset');
waitingRequests.enqueue('Ticket #202 - No Internet');
waitingRequests.enqueue('Ticket #203 - Printer Problem');
waitingRequests.enqueue('Ticket #204 - Software Installation');

// Display and process two requests.
console.log('Next Request: ' + waitingRequests.front());
console.log('Processed: ' + waitingRequests.dequeue());
console.log('Processed: ' + waitingRequests.dequeue());
console.log('Remaining Requests: ' + waitingRequests.toString());
console.log('Queue Size: ' + waitingRequests.size());

// ================================================================
// PART C: PRIORITY QUEUE
// ================================================================

class PriorityQueue {
  constructor() {
    // Create internal storage.
    this.items = [];
  }

  // Insert by priority, preserving arrival order for ties.
  enqueue(request, priority) {
    const item = { request: request, priority: priority };
    let insertAt = this.items.length;

    // Find the correct insertion position.
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > priority) {
        insertAt = i;
        break;
      }
    }

    this.items.splice(insertAt, 0, item);
  }

  // Remove and return the first item.
  dequeue() {
    if (this.items.length === 0) return undefined;
    return this.items.shift();
  }

  // Return the number of items.
  size() {
    return this.items.length;
  }

  // Display all requests and priorities.
  print() {
    this.items.forEach((item) => {
      console.log(
        item.request + ', Priority ' + item.priority
      );
    });
  }
}

console.log('\nPART C: URGENT REQUESTS');

const urgentRequests = new PriorityQueue();

// Add the required requests.
urgentRequests.enqueue('Ticket #301 - Install Browser', 3);
urgentRequests.enqueue('Ticket #302 - Server Offline', 1);
urgentRequests.enqueue('Ticket #303 - Faculty PC Failure', 2);
urgentRequests.enqueue('Ticket #304 - Internet Laboratory Down', 1);

// Display the initial priority order.
console.log('Initial Priority Order:');
urgentRequests.print();

// Process the first request.
const processedPriorityRequest = urgentRequests.dequeue();

console.log(
  'Processed Priority Request: ' +
  processedPriorityRequest.request +
  ', Priority ' +
  processedPriorityRequest.priority
);

// Display the remaining requests.
console.log('Remaining Priority Requests:');
urgentRequests.print();

// ================================================================
// PART D: LINKED LIST
// ================================================================

class Node {
  constructor(element) {
    // Store the element and initialize next.
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    // Initialize an empty list.
    this.length = 0;
    this.head = null;
  }

  // Add a node at the end.
  append(element) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;

      // Traverse to the last node.
      while (current.next !== null) {
        current = current.next;
      }

      current.next = node;
    }

    this.length++;
  }

  // Insert a node at a valid position.
  insert(position, element) {
    if (position < 0 || position > this.length) {
      return false;
    }

    const node = new Node(element);

    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let previous = this.head;

      // Find the node before the insertion position.
      for (let i = 0; i < position - 1; i++) {
        previous = previous.next;
      }

      node.next = previous.next;
      previous.next = node;
    }

    this.length++;
    return true;
  }

  // Remove and return the element at a position.
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return undefined;
    }

    let current = this.head;

    if (position === 0) {
      this.head = current.next;
    } else {
      let previous = this.head;

      // Find the node before the one to remove.
      for (let i = 0; i < position - 1; i++) {
        previous = previous.next;
      }

      current = previous.next;
      previous.next = current.next;
    }

    this.length--;
    return current.element;
  }

  // Find an element and return its index.
  indexOf(element) {
    let current = this.head;
    let index = 0;

    // Traverse the linked nodes.
    while (current !== null) {
      if (current.element === element) {
        return index;
      }

      current = current.next;
      index++;
    }

    return -1;
  }

  // Remove the first matching element.
  remove(element) {
    const index = this.indexOf(element);

    if (index === -1) {
      return undefined;
    }

    return this.removeAt(index);
  }

  // Check whether the list is empty.
  isEmpty() {
    return this.length === 0;
  }

  // Return the number of nodes.
  size() {
    return this.length;
  }

  // Convert the linked list to text.
  toString() {
    const elements = [];
    let current = this.head;

    while (current !== null) {
      elements.push(current.element);
      current = current.next;
    }

    return elements.join(', ');
  }
}

console.log('\nPART D: COMPLETED REQUESTS');

const completedRequests = new LinkedList();

// Append the three required requests.
completedRequests.append('Ticket #401 - Account Activated');
completedRequests.append('Ticket #402 - Printer Connected');
completedRequests.append('Ticket #403 - Antivirus Updated');

// Insert Ticket #400 at the beginning.
completedRequests.insert(
  0,
  'Ticket #400 - Computer Diagnosed'
);

// Insert Ticket #405 at the end.
completedRequests.insert(
  completedRequests.size(),
  'Ticket #405 - Browser Updated'
);

// Display the complete list and search for Ticket #402.
console.log(
  'Complete List: ' + completedRequests.toString()
);

console.log(
  'Index of Ticket #402: ' +
  completedRequests.indexOf(
    'Ticket #402 - Printer Connected'
  )
);

// Remove the item at position 1.
console.log(
  'Removed at Position 1: ' +
  completedRequests.removeAt(1)
);

// Remove Ticket #403 by value.
console.log(
  'Removed by Value: ' +
  completedRequests.remove(
    'Ticket #403 - Antivirus Updated'
  )
);

// Display the final list and size.
console.log(
  'Final List: ' + completedRequests.toString()
);
console.log('Final Size: ' + completedRequests.size());