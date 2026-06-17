try {
    console.log('Testing express...');
    require('express');
    console.log('Testing mongoose...');
    require('mongoose');
    console.log('Testing cors...');
    require('cors');
    console.log('Testing dotenv...');
    require('dotenv');
    console.log('All dependencies loaded successfully');
} catch (e) {
    console.error('FAILED to load dependency:', e.message);
}
