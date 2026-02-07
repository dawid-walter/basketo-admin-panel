import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

// Mock product data
const mockProducts = [
  { id: '1', name: 'Ancient Dragon - Red', price: 149.99, stock: 15, category: 'Fantasy', status: 'active' },
  { id: '2', name: 'Spaceship Explorer', price: 199.99, stock: 8, category: 'Sci-Fi', status: 'active' },
  { id: '3', name: 'Anime Hero Statue', price: 129.99, stock: 0, category: 'Anime', status: 'out_of_stock' },
  { id: '4', name: 'Fantasy Wizard', price: 139.99, stock: 12, category: 'Fantasy', status: 'active' },
  { id: '5', name: 'Robot Guardian', price: 179.99, stock: 20, category: 'Sci-Fi', status: 'active' },
];

export const ProductsPage = () => {
  const [products] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockBadge = (stock: number, status: string) => {
    if (status === 'out_of_stock' || stock === 0) {
      return <Badge variant="error">Out of Stock</Badge>;
    }
    if (stock < 10) {
      return <Badge variant="warning">Low Stock ({stock})</Badge>;
    }
    return <Badge variant="success">In Stock ({stock})</Badge>;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your product catalog
            </p>
          </div>
          <Button>
            + Add New Product
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Anime">Anime</option>
                <option value="Cyberpunk">Cyberpunk</option>
                <option value="Historical">Historical</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Products Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <p className="text-lg font-semibold mb-2">No products found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                            {/* TODO: Product image placeholder */}
                            📦
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {product.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{product.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStockBadge(product.stock, product.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredProducts.length}</span> of{' '}
                <span className="font-medium">{products.length}</span> products
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {products.filter(p => p.stock === 0).length}
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {products.filter(p => p.stock > 0 && p.stock < 10).length}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
