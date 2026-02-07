import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    storeName: 'My Basketo Store',
    storeEmail: 'store@example.com',
    supportEmail: 'support@example.com',
    currency: 'USD',
    shippingRate: '9.99',
    freeShippingThreshold: '100',
    deliveryTime: '5-7',
    orderNotifications: true,
    paidNotifications: true,
    dailySummary: false,
  });

  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  const handleSave = () => {
    // TODO: Implement save functionality
    alert('Settings saved successfully!');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Store Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your store configuration and preferences
          </p>
        </div>

        {/* General Settings */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name
              </label>
              <Input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                placeholder="My Store"
              />
              <p className="text-xs text-gray-500 mt-1">
                This name appears on customer receipts and emails.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Email
              </label>
              <Input
                type="email"
                value={settings.storeEmail}
                onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                placeholder="store@example.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Customer notifications will be sent from this address.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Email
              </label>
              <Input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                placeholder="support@example.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Customers can reply to this email for support.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Currency
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="PLN">PLN - Polish Zloty</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Payment Settings */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Payment Provider: Stripe</p>
                  <p className="text-sm text-gray-600">Connected and active</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Manage Stripe Account
              </Button>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Accepted Payment Methods:</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="rounded" />
                  <span className="text-sm">Credit/Debit Cards</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="rounded" />
                  <span className="text-sm">Apple Pay</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="rounded" />
                  <span className="text-sm">Google Pay</span>
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Shipping Settings */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Shipping Rate ({settings.currency})
              </label>
              <Input
                type="number"
                step="0.01"
                value={settings.shippingRate}
                onChange={(e) => setSettings({ ...settings, shippingRate: e.target.value })}
                placeholder="9.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Free Shipping Threshold ({settings.currency})
              </label>
              <Input
                type="number"
                step="0.01"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
                placeholder="100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Orders over this amount receive free shipping
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Delivery Time (business days)
              </label>
              <Input
                type="text"
                value={settings.deliveryTime}
                onChange={(e) => setSettings({ ...settings, deliveryTime: e.target.value })}
                placeholder="5-7"
              />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700">Order Notifications:</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.orderNotifications}
                  onChange={(e) => setSettings({ ...settings, orderNotifications: e.target.checked })}
                  className="rounded"
                />
                <div>
                  <p className="text-sm font-medium">Email me when new orders are placed</p>
                  <p className="text-xs text-gray-500">Get instant notifications for new orders</p>
                </div>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.paidNotifications}
                  onChange={(e) => setSettings({ ...settings, paidNotifications: e.target.checked })}
                  className="rounded"
                />
                <div>
                  <p className="text-sm font-medium">Email me when orders are paid</p>
                  <p className="text-xs text-gray-500">Track payment confirmations</p>
                </div>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.dailySummary}
                  onChange={(e) => setSettings({ ...settings, dailySummary: e.target.checked })}
                  className="rounded"
                />
                <div>
                  <p className="text-sm font-medium">Daily summary report</p>
                  <p className="text-xs text-gray-500">Receive a daily digest of store activity</p>
                </div>
              </label>
            </div>

            <div className="pt-4">
              <Button variant="outline" size="sm">
                Customize Email Templates
              </Button>
            </div>
          </div>
        </Card>

        {/* API Settings */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">API Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <div className="flex gap-2">
                <Input
                  type={apiKeyVisible ? "text" : "password"}
                  value="sk_live_••••••••••••••••••••••••"
                  readOnly
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  onClick={() => setApiKeyVisible(!apiKeyVisible)}
                >
                  {apiKeyVisible ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                Generate New Key
              </Button>
              <Button variant="outline" size="sm">
                View Documentation
              </Button>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Keep your API key secure. Never share it publicly or commit it to version control.
              </p>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </Layout>
  );
};
