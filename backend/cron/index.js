const cron = require('node-cron')
const redis = require('../redis')

module.exports.deleteOtps = cron.schedule('*/1 * * * *', () => {
    redis.keys('*').then(keys => {
        let pipeline = redis.pipeline();
        keys.forEach(key => {
            const expirationTime = key.split(':')[1]
            if (expirationTime < Date.now())
                pipeline.del(key);
        });
        return pipeline.exec();
    });
}, {
    scheduled: false
})