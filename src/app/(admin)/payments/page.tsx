import { Search, Plus, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPayments } from "@/actions/payments";

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payments & Dues</h1>
          <p className="text-gray-500 mt-1">Live data from MongoDB</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-5 py-3 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Record Payment
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-6 gap-4 p-4 border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-2">Resident</div>
          <div>Amount / Status</div>
          <div>Method</div>
          <div>Date</div>
          <div className="text-right">Action</div>
        </div>

        {payments.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No payment records found.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {payments.map((payment: any) => (
              <div key={payment._id} className="p-4 sm:p-5 hover:bg-gray-50/50 transition-colors flex flex-col md:grid md:grid-cols-6 md:gap-4 md:items-center">
                <div className="flex items-start justify-between md:col-span-2 mb-3 md:mb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                      {payment.tenantName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 leading-tight">{payment.tenantName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Room {payment.roomInfo}</p>
                    </div>
                  </div>
                  <div className="md:hidden">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                      payment.status === "Paid" && "bg-green-100 text-green-700",
                      payment.status === "Partially Paid" && "bg-blue-100 text-blue-700",
                      payment.status === "Due" && "bg-orange-100 text-orange-700",
                      payment.status === "Overdue" && "bg-red-100 text-red-700",
                    )}>
                      {payment.status}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end md:block md:col-span-1 mb-2 md:mb-0">
                  <span className="text-sm font-medium text-gray-500 md:hidden">Amount:</span>
                  <div>
                    <p className="font-bold text-gray-900 text-lg md:text-base">
                      ₹{(payment.amountRemaining || payment.amountPaid).toLocaleString()}
                    </p>
                    {payment.status === "Partially Paid" && payment.amountExpected && (
                      <p className="text-xs text-gray-500">of ₹{payment.amountExpected.toLocaleString()}</p>
                    )}
                    <span className={cn(
                      "hidden md:inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                      payment.status === "Paid" && "bg-green-100 text-green-700",
                      payment.status === "Partially Paid" && "bg-blue-100 text-blue-700",
                      payment.status === "Due" && "bg-orange-100 text-orange-700",
                      payment.status === "Overdue" && "bg-red-100 text-red-700",
                    )}>
                      {payment.status}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between md:block md:col-span-1 mb-1 md:mb-0">
                  <span className="text-sm font-medium text-gray-500 md:hidden">Method:</span>
                  <span className="text-sm text-gray-700 font-medium">{payment.paymentMethod || "-"}</span>
                </div>
                
                <div className="flex justify-between md:block md:col-span-1 mb-4 md:mb-0">
                  <span className="text-sm font-medium text-gray-500 md:hidden">Date:</span>
                  <span className={cn(
                    "text-sm font-medium flex items-center gap-1.5",
                    payment.status === "Overdue" ? "text-red-600" : "text-gray-500"
                  )}>
                    {payment.dateString}
                  </span>
                </div>

                <div className="md:col-span-1 md:text-right border-t border-gray-100 pt-3 md:border-0 md:pt-0">
                  {payment.status === "Paid" ? (
                    <button className="w-full md:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-sm font-medium transition-colors border border-gray-200">
                      Receipt
                    </button>
                  ) : (
                    <button className="w-full md:w-auto px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-bold transition-colors">
                      Collect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
