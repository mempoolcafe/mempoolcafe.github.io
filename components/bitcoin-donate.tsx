import UnderConstruction from "@/components/under-construction";

// Placeholder for Bitcoin tips on /donate. Bitcoin can't go through the
// Ethereum contract, so this is its own spot: e.g. show a BTC address with a
// copy button and QR code, or a Lightning invoice.
export default function BitcoinDonate() {
  return (
    <div className="box space-y-3 bg-[#f4f4f0]">
      <UnderConstruction />
      <p className="text-center">
        a bitcoin address for tips is coming soon!
      </p>
      <p className="text-center">
        <button
          type="button"
          className="btn-classic disabled:cursor-not-allowed disabled:opacity-60"
          disabled
        >
          Copy BTC Address
        </button>
      </p>
    </div>
  );
}
