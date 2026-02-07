import { useMemo } from 'react';
import type { Order } from '../../types';
import { StatsCard } from './StatsCard';
import { formatCurrency } from '../../utils/format';

interface DashboardStatsProps {
  orders: Order[];
}

export const DashboardStats = ({ orders }: DashboardStatsProps) => {
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter(o => o.status === 'PAID' || o.status === 'SHIPPED')
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const ordersByStatus = {
      created: orders.filter(o => o.status === 'CREATED').length,
      paid: orders.filter(o => o.status === 'PAID').length,
      shipped: orders.filter(o => o.status === 'SHIPPED').length,
      cancelled: orders.filter(o => o.status === 'CANCELLED').length,
    };

    return {
      totalOrders,
      totalRevenue,
      ordersByStatus,
    };
  }, [orders]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Orders"
        value={stats.totalOrders}
        icon={
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        }
      />
      <StatsCard
        title="Total Revenue"
        value={formatCurrency(stats.totalRevenue, 'PLN')}
        icon={
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <StatsCard
        title="Paid Orders"
        value={stats.ordersByStatus.paid}
        icon={
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <StatsCard
        title="Pending Orders"
        value={stats.ordersByStatus.created}
        icon={
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    </div>
  );
};
