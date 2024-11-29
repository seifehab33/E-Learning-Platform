import BillingForm from "./CartFrom";
import SelectedPlan from "./CartPlan";

function Cart() {
  return (
    <section className="mt-[120px] mx-auto max-w-[1280px] flex gap-5 justify-between flex-col lg:flex-row">
      <BillingForm />
      <div>
        <SelectedPlan />
      </div>
    </section>
  );
}

export default Cart;
