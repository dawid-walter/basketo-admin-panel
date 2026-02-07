import api from './api';
import type { Order } from '../types';

export const ordersService = {
  getAllOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/api/admin/orders');
    return response.data;
  },
};
