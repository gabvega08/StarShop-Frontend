import { BaseApi } from '@/shared/api/baseApi';
import { RegisterData, RegisterResponse } from '../types/register';

export class RegisterService extends BaseApi {
  private static instance: RegisterService;

  protected constructor() {
    super();
  }

  public static getInstance(): RegisterService {
    if (!RegisterService.instance) {
      RegisterService.instance = new RegisterService();
    }
    return RegisterService.instance;
  }

  static async register(registerData: RegisterData): Promise<RegisterResponse> {
    const instance = RegisterService.getInstance();
    return instance.registerInstance(registerData);
  }

  private async registerInstance(
    registerData: RegisterData
  ): Promise<RegisterResponse> {
    try {
      const { profile, ...rest } = registerData;
      const transformedData = {
        ...rest,
        role: profile,
      };

      const response = await this.post<RegisterResponse>(
        '/api/v1/auth/register',
        transformedData
      );

      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }
}
