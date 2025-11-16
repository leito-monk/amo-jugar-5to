/**
 * Simple test for useLocalStorage composable
 * This test uses a mock localStorage implementation
 */

// Mock localStorage for Node.js environment
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }

  get length() {
    return Object.keys(this.store).length;
  }

  key(index) {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

// Setup global localStorage mock
global.localStorage = new LocalStorageMock();

// Import the composable
const localStorage = await import('./useLocalStorage.js');

// Test counter
let tests = 0;
let passed = 0;

function test(name, fn) {
  tests++;
  try {
    fn();
    passed++;
    console.log(`✅ PASS: ${name}`);
  } catch (error) {
    console.error(`❌ FAIL: ${name}`);
    console.error(`   ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Clear localStorage before tests
global.localStorage.clear();

console.log('\n🧪 Testing useLocalStorage.js\n');

// Test 1: save() and load()
test('save() should store data with prefix', () => {
  const result = localStorage.save('test1', { value: 123 });
  assert(result === true, 'save() should return true');
  
  const raw = global.localStorage.getItem('yoAmoAprender_test1');
  assert(raw !== null, 'Data should be stored');
  assert(raw === '{"value":123}', 'Data should be JSON stringified');
});

test('load() should retrieve and parse data', () => {
  localStorage.save('test2', { name: 'John', age: 30 });
  const data = localStorage.load('test2');
  
  assert(data !== null, 'Data should be loaded');
  assert(data.name === 'John', 'Data should have correct name');
  assert(data.age === 30, 'Data should have correct age');
});

test('load() should return null for non-existent keys', () => {
  const data = localStorage.load('nonexistent');
  assert(data === null, 'Should return null for non-existent key');
});

// Test 2: remove()
test('remove() should delete entry', () => {
  localStorage.save('test3', 'value');
  const result = localStorage.remove('test3');
  
  assert(result === true, 'remove() should return true');
  const data = localStorage.load('test3');
  assert(data === null, 'Data should be removed');
});

// Test 3: getAllKeys()
test('getAllKeys() should list all project keys', () => {
  global.localStorage.clear();
  
  localStorage.save('key1', 'value1');
  localStorage.save('key2', 'value2');
  localStorage.save('key3', 'value3');
  
  // Add a key without prefix
  global.localStorage.setItem('otherApp_key', 'value');
  
  const keys = localStorage.getAllKeys();
  
  assert(Array.isArray(keys), 'Should return an array');
  assert(keys.length === 3, 'Should only return project keys');
  assert(keys.includes('key1'), 'Should include key1');
  assert(keys.includes('key2'), 'Should include key2');
  assert(keys.includes('key3'), 'Should include key3');
  assert(!keys.includes('otherApp_key'), 'Should not include other app keys');
});

// Test 4: clear()
test('clear() should remove all project entries', () => {
  global.localStorage.clear();
  
  localStorage.save('clear1', 'value1');
  localStorage.save('clear2', 'value2');
  global.localStorage.setItem('otherApp_data', 'preserve');
  
  const result = localStorage.clear();
  
  assert(result === true, 'clear() should return true');
  
  const keys = localStorage.getAllKeys();
  assert(keys.length === 0, 'All project keys should be removed');
  
  const otherData = global.localStorage.getItem('otherApp_data');
  assert(otherData === 'preserve', 'Other app data should be preserved');
});

// Test 5: Complex data types
test('save() and load() should handle arrays', () => {
  const arr = [1, 2, 3, 4, 5];
  localStorage.save('array', arr);
  const loaded = localStorage.load('array');
  
  assert(Array.isArray(loaded), 'Should load as array');
  assert(loaded.length === 5, 'Should have correct length');
  assert(JSON.stringify(loaded) === JSON.stringify(arr), 'Should match original array');
});

test('save() and load() should handle nested objects', () => {
  const obj = {
    user: {
      name: 'Alice',
      scores: [100, 95, 88],
      settings: {
        theme: 'dark',
        notifications: true
      }
    }
  };
  
  localStorage.save('nested', obj);
  const loaded = localStorage.load('nested');
  
  assert(loaded.user.name === 'Alice', 'Should preserve nested structure');
  assert(loaded.user.scores[1] === 95, 'Should preserve arrays in objects');
  assert(loaded.user.settings.theme === 'dark', 'Should preserve deeply nested data');
});

// Test 6: Error handling
test('save() should handle errors gracefully', () => {
  // Create a circular reference
  const circular = { a: 1 };
  circular.self = circular;
  
  const result = localStorage.save('circular', circular);
  assert(result === false, 'Should return false on error');
});

test('load() should handle corrupted data gracefully', () => {
  global.localStorage.setItem('yoAmoAprender_corrupted', 'not valid json {]');
  const data = localStorage.load('corrupted');
  assert(data === null, 'Should return null on parse error');
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`📊 Tests: ${passed}/${tests} passed`);
console.log('='.repeat(50) + '\n');

if (passed === tests) {
  console.log('🎉 All tests passed!\n');
  process.exit(0);
} else {
  console.log('⚠️  Some tests failed.\n');
  process.exit(1);
}
