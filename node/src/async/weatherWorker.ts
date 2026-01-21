import Redis from 'ioredis';
import cron from 'node-cron';

const redis = new Redis();

function WeatherData() {
  return {
    temperature: Math.floor(Math.random() * 30), 
    humidity: Math.floor(Math.random() * 50) ,    
    description: 'Clear sky',                          
  };
}

async function storeWeatherInRedis(weatherData: any): Promise<void> {
  const timestamp = Date.now(); 
  await redis.setex(`${timestamp}`, 600, JSON.stringify(weatherData));
}

cron.schedule('* * * * *', async () => {
  try {
    const weatherData = WeatherData();
    await storeWeatherInRedis(weatherData);
    console.log('Weather data stored in Redis!');
  } catch (error) {
    console.error('Error during cron job execution:', error);
  }
});
