'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/store/cart';

function fmt(amount: number, currency = 'USD') {
  // Store uses dollars. If you switch to cents later, use amount/100 here.
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export default function CartPage() {
  const { items, add, remove, clear } = useCart();

  const subtotal = (items ?? []).reduce(
    (sum, i) => sum + (i.price || 0) * (i.qty || 0),
    0
  );
  const currency = items[0]?.currency ?? 'USD';

  return (
    <section className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link href="/shop" className="btn btn-brand mt-4">Go to Shop</Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 border-b pb-3">
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-md bg-neutral-200 grid place-items-center text-xs opacity-70">
                      No image
                    </div>
                  )}

                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm opacity-70">
                      {fmt(item.price, item.currency)} × {item.qty}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="btn"
                    onClick={() => {
                      if (item.qty > 1) add({ ...item, qty: -1 });
                      else remove(item.id);
                    }}
                  >
                    –
                  </button>
                  <span className="w-8 text-center">{item.qty}</span>
                  <button className="btn" onClick={() => add({ ...item, qty: 1 })}>
                    +
                  </button>

                  <button onClick={() => remove(item.id)} className="btn">Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mt-8">
            <button className="btn" onClick={clear}>Clear Cart</button>

            <div className="text-right">
              <div className="text-lg font-semibold">
                Subtotal: {fmt(subtotal, currency)}
              </div>

              {/* Placeholder checkout */}
              <form
  action="/api/checkout"
  method="post"
  onSubmit={(e) => {
    // build the minimal payload for the API
    const payload = JSON.stringify({
      items: items.map((i) => ({
        variationId: i.variationId ?? i.productId ?? i.id, // prefer variation id
        qty: i.qty,
        note: i.note,
      })),
    });
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'payload';
    input.value = payload;
    e.currentTarget.appendChild(input);
  }}
>
  <button className="btn btn-brand" type="submit">Checkout</button>
</form>
            </div>
          </div>
        </>
      )}
    </section>
  );
}