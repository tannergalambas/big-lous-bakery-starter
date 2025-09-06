export default function ThanksPage() {
  return (
    <section className="container py-16 text-center">
      <h1 className="text-3xl font-bold mb-2">Thank you!</h1>
      <p className="opacity-80">Your order has been received. A receipt will be emailed shortly.</p>
      <div className="mt-6">
        <a href="/shop" className="btn">Continue Shopping</a>
      </div>
    </section>
  );
}

