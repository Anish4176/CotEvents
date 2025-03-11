import { findOrdersByEvent } from '@/actions/order.action'
import { formatDateTime, formatPrice } from '@/lib/utils'
import { IOrderItem } from '@/types'
import { useSearchParams } from 'next/navigation'
import React from 'react'
type paramsProps={
  params:{
    id:string
  }
}
const page = async({params}:paramsProps) => {
   const {id}=params;
   const orders= await findOrdersByEvent(id);
   console.log(orders)
  //  {
  //   _id: '67c5514724bcd7c19f3523e6',
  //   RazorpaymentId: 'pay_Q2E0JUEDi8QTFl',
  //   eventId: '67bc65cd2702aa7e0ba3fa84',
  //   BuyerId: {
    //   _id: '67c2f985aee99f7f16a41775',
    //   email: 'anish.webwizard@gmail.com',
    //   firstName: 'ANISH'
    // }
  //   totalAmount: 200,
  //   __v: 0
  // }
  return (
    <>
    <div className='min-h-screen'>

   
    <div className="h-24 md:h-44 bg-gray-50 flex justify-center items-center">
        <h1 className="heading mx-auto">Order Details</h1>
      </div>

    <section className="wrapper mt-8 ">
      {/* <Search placeholder="Search buyer name..." /> */}
    </section>

    <section className="wrapper overflow-x-auto">
      <table className="w-full border-collapse border-t">
        <thead>
          <tr className="p-medium-14 border-b text-grey-500">
            <th className="min-w-[250px] py-3 text-left">Order ID</th>
            <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Event Title</th>
            <th className="min-w-[150px] py-3 text-left">Buyer Name</th>
            <th className="min-w-[150px] py-3 text-left">Buyer Email</th>
            <th className="min-w-[100px] py-3 text-left">Created</th>
            <th className="min-w-[100px] py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length === 0 ? (
            <tr className="border-b">
              <td colSpan={5} className="py-4 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          ) : (
            <>
              {orders &&
                orders.map((row: IOrderItem) => (
                  <tr
                    key={row._id}
                    className="p-regular-14 lg:p-regular-16 border-b "
                    style={{ boxSizing: 'border-box' }}>
                    <td className="min-w-[250px] py-4 text-primary-500">{row.RazorpaymentId}</td>
                    <td className="min-w-[200px] flex-1 py-4 pr-4">{row.eventId.title}</td>
                    <td className="min-w-[150px] py-4">{row.BuyerId.firstName}</td>
                    <td className="min-w-[150px] py-4">{row.BuyerId.email}</td>
                    {row.createdAt && <td className="min-w-[100px] py-4">
                      {formatDateTime(row.createdAt).dateTime}
                    </td>}
                    <td className="min-w-[100px] py-4 text-right">
                      {formatPrice(row.totalAmount)}
                    </td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>
    </section>
    </div>
  </>
  )
}

export default page