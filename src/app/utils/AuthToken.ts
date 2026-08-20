import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export const authStorage = {

  async saveAccessToken(token: string) {
    await AsyncStorage.setItem(
      ACCESS_TOKEN,
      token
    );
  },

  async getAccessToken() {
    return await AsyncStorage.getItem(
      ACCESS_TOKEN
    );
  },

  async saveRefreshToken(token: string) {
    await AsyncStorage.setItem(
      REFRESH_TOKEN,
      token
    );
  },

  async getRefreshToken() {
    return await AsyncStorage.getItem(
      REFRESH_TOKEN
    );
  },

  async clearTokens() {
    await AsyncStorage.multiRemove([
      ACCESS_TOKEN,
      REFRESH_TOKEN,
    ]);
  },
};