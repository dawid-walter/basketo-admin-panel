import { Layout } from '../components/layout/Layout';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { OrdersTable } from '../components/orders/OrdersTable';
import { Card } from '../components/common/Card';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useOrders } from '../hooks/useOrders';

export const DashboardPage = () => {
  const { orders, loading, error } = useOrders();

  // Get current time for personalized greeting
  const hour = new Date().getHours();
  const getGreeting = () => {
    if (hour >= 6 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 18) return 'Good afternoon';
    if (hour >= 18 && hour < 24) return 'Good evening';
    return 'Welcome back';
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Enhanced Welcome Message */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getGreeting()}! 👋
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {orders.length > 0
              ? `You've processed ${orders.length} order${orders.length !== 1 ? 's' : ''} total. Great work!`
              : 'Your store is all set up and ready to receive orders.'}
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <Card>
            <div className="text-red-600">{error}</div>
          </Card>
        ) : orders.length === 0 ? (
          /* Empty State */
          <Card>
            <div className="text-center py-12">
              {/* TODO: Replace with empty state illustration from IMAGE_PROMPTS.md (ADMIN-01) */}
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                No Orders Yet
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your store is live and ready! Here's how to get your first order:
              </p>
              <div className="space-y-3 text-left max-w-md mx-auto mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <p className="font-semibold">Share Your Store Link</p>
                    <p className="text-sm text-gray-600">Send your store URL to customers or add it to your social media.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <p className="font-semibold">Test the Checkout</p>
                    <p className="text-sm text-gray-600">Place a test order to see the customer experience firsthand.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <p className="font-semibold">Set Up Products</p>
                    <p className="text-sm text-gray-600">Make sure your product catalog is complete and appealing.</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Getting Started Guide
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </Card>
        ) : (
          <>
            <DashboardStats orders={orders} />

            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Orders
              </h2>
              <OrdersTable orders={orders.slice(0, 10)} />
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};
