import { axiosInstance } from '@/shared/api/baseApi';
import { RegisterData, RegisterResponse } from '../types/register';

export class RegisterService {
  private static readonly BASE_URL_AUTH = '/api/v1/auth';
  private static readonly REGISTER_ENDPOINT = `${this.BASE_URL_AUTH}/register`;

  static async register(registerData: RegisterData): Promise<RegisterResponse> {
    try {
      const { profile, ...rest } = registerData;
      const transformedData = {
        ...rest,
        role: profile,
      };

      const response = await axiosInstance.post<RegisterResponse>(
        this.REGISTER_ENDPOINT,
        transformedData
      );

      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }
}
