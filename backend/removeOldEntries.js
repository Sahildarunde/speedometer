import { SpeedData } from './models/speedData.js';

const removeOldEntries = async () => {
  try {
    const count = await SpeedData.count();
    const maxEntries = 1000;
    if (count >= maxEntries) {
      const entriesToRemove = count - maxEntries + 100;
      await SpeedData.destroy({ limit: entriesToRemove });
    }
  } catch (error) {
    console.error('Error removing old entries:', error);
  }
};

export default removeOldEntries;
