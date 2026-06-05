import type { Customer } from '@/lib/mock-data';

interface ModernTableProps {
  customers: Customer[];
}

export default function ModernTable({ customers }: ModernTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-premium">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <th className="px-5 py-4">Name</th>
            <th className="px-5 py-4">Email</th>
            <th className="px-5 py-4">Last Purchase</th>
            <th className="px-5 py-4">Lifetime Spend</th>
            <th className="px-5 py-4">Orders</th>
            <th className="px-5 py-4">Category</th>
            <th className="px-5 py-4">Location</th>
            <th className="px-5 py-4">Engagement</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b border-slate-100 text-slate-600 last:border-0 hover:bg-amber-50/30">
              <td className="px-5 py-4 font-bold text-slate-900">{customer.name}</td>
              <td className="px-5 py-4">{customer.email}</td>
              <td className="px-5 py-4">{customer.lastPurchaseDays} days ago</td>
              <td className="px-5 py-4 font-semibold">Rs {customer.lifetimeSpend.toLocaleString('en-IN')}</td>
              <td className="px-5 py-4">{customer.ordersCount}</td>
              <td className="px-5 py-4 text-accent">{customer.preferredCategory}</td>
              <td className="px-5 py-4">{customer.location}</td>
              <td className="px-5 py-4">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: `${customer.engagementScore}%` }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
