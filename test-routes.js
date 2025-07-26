const http = require('http');

function testRoute(path, expectedStatus = 200) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      console.log(`${path}: ${res.statusCode} (expected: ${expectedStatus})`);
      resolve({ path, status: res.statusCode, expected: expectedStatus });
    });

    req.on('error', (err) => {
      console.log(`${path}: ERROR - ${err.message}`);
      resolve({ path, status: 'ERROR', error: err.message });
    });

    req.on('timeout', () => {
      console.log(`${path}: TIMEOUT`);
      req.destroy();
      resolve({ path, status: 'TIMEOUT' });
    });

    req.end();
  });
}

async function testRoutes() {
  console.log('Testing routes...\n');
  
  const routes = [
    { path: '/', status: 200 },
    { path: '/auth/signin', status: 200 },
    { path: '/auth/signup', status: 200 },
    { path: '/dashboard', status: 307 }, // Should redirect to signin
    { path: '/api/auth/session', status: 200 },
  ];

  for (const route of routes) {
    await testRoute(route.path, route.status);
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
  }
  
  console.log('\nRoute testing complete');
}

testRoutes().catch(console.error);