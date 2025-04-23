const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'AUTO_READ_STATUS', value: 'true' },
    { key: 'AUTO_VOICE', value: 'true' },
    { key: 'MODE', value: 'public' },
    { key: 'AUTO_STICKER', value: 'false' },
    { key: 'AUTO_REPLY', value: 'false' },
    { key: 'AUTO_REACT', value: 'false' },
    { key: 'HEART_REACT', value: 'false' },
    { key: 'OWNER_REACT', value: 'false' },
    { key: 'WELCOME_SET', value: 'false' },
    { key: 'WELCOME_ALERT', value: 'false' },
    { key: 'WELCOME', value: 'false' },
    { key: 'ALLOWS_ONLINE', value: 'false' },
    { key: 'ANTI_LINK', value: 'false' },
    { key: 'ANTI_BAD', value: 'false' },
    { key: 'READ_MESSAGE', value: 'false' },
    { key: 'ALLWAYS_OFFLINE', value: 'false' },
    { key: 'ANTI_DELETE', value: 'false' },
    { key: 'AUTO_TYPING', value: 'false' },
    { key: 'AI_CHAT', value: 'false' },
    { key: 'AUTO_BLOCK', value: 'false' },
    { key: 'ANTI_BOT', value: 'false' },
    { key: 'AUTO_REACT_STATUS', value: 'true' },
    { key: 'ANTI_CALL', value: 'false' },
    { key: 'FAKE_RECORDING', value: 'false' },
];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
                                                      
