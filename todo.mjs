#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const DB_FILE = resolve(new URL('.', import.meta.url).pathname, 'todos.json');

function loadTodos() {
  if (!existsSync(DB_FILE)) return [];
  try {
    return JSON.parse(readFileSync(DB_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  writeFileSync(DB_FILE, JSON.stringify(todos, null, 2), 'utf8');
}

function nextId(todos) {
  return todos.length === 0 ? 1 : Math.max(...todos.map(t => t.id)) + 1;
}

function addTodo(text) {
  if (!text || !text.trim()) {
    console.error('Error: task text is required');
    process.exit(1);
  }
  const todos = loadTodos();
  const todo = {
    id: nextId(todos),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  saveTodos(todos);
  console.log(`Added [${todo.id}] ${todo.text}`);
}

function listTodos() {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log('No todos yet. Add one with: node todo.mjs add "Your task"');
    return;
  }
  console.log('');
  for (const t of todos) {
    const status = t.completed ? '[x]' : '[ ]';
    const date = new Date(t.createdAt).toLocaleDateString();
    console.log(`  ${status} ${t.id}. ${t.text}  (created: ${date})`);
  }
  console.log('');
  const done = todos.filter(t => t.completed).length;
  console.log(`  ${done}/${todos.length} completed`);
}

function markDone(idStr) {
  const id = parseInt(idStr, 10);
  if (isNaN(id)) {
    console.error('Error: id must be a number');
    process.exit(1);
  }
  const todos = loadTodos();
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    console.error(`Error: todo #${id} not found`);
    process.exit(1);
  }
  if (todo.completed) {
    console.log(`Todo #${id} is already marked complete.`);
    return;
  }
  todo.completed = true;
  saveTodos(todos);
  console.log(`Marked done: [${todo.id}] ${todo.text}`);
}

function deleteTodo(idStr) {
  const id = parseInt(idStr, 10);
  if (isNaN(id)) {
    console.error('Error: id must be a number');
    process.exit(1);
  }
  const todos = loadTodos();
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    console.error(`Error: todo #${id} not found`);
    process.exit(1);
  }
  const [removed] = todos.splice(index, 1);
  saveTodos(todos);
  console.log(`Deleted [${removed.id}] ${removed.text}`);
}

function printHelp() {
  console.log(`
Usage:
  node todo.mjs add <text>    Add a new todo
  node todo.mjs list          List all todos
  node todo.mjs done <id>     Mark a todo as complete
  node todo.mjs delete <id>   Delete a todo
`);
}

const [,, command, ...args] = process.argv;

switch (command) {
  case 'add':
    addTodo(args.join(' '));
    break;
  case 'list':
    listTodos();
    break;
  case 'done':
    markDone(args[0]);
    break;
  case 'delete':
    deleteTodo(args[0]);
    break;
  default:
    printHelp();
    if (command) process.exit(1);
}
