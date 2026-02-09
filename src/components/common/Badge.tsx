import type { OrderStatus } from '../../types';
import type { ReactNode } from 'react';

// Generic Badge with variants
interface GenericBadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

// Order Status Badge
interface OrderBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  CREATED: { label: 'Created', color: 'bg-yellow-100 text-yellow-800' },
  PAID: { label: 'Paid', color: 'bg-green-100 text-green-800' },
  SHIPPED: { label: 'Shipped', color: 'bg-blue-100 text-blue-800' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
};

const variantColors = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
};

// Overloaded Badge component - accepts either status or children+variant
export function Badge(props: OrderBadgeProps): JSX.Element;
export function Badge(props: GenericBadgeProps): JSX.Element;
export function Badge(props: OrderBadgeProps | GenericBadgeProps): JSX.Element {
  // Check if it's OrderBadgeProps
  if ('status' in props) {
    const config = statusConfig[props.status];
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  }

  // GenericBadgeProps
  const color = variantColors[props.variant || 'info'];
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {props.children}
    </span>
  );
}
