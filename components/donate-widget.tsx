import UnderConstruction from "@/components/under-construction";

// Placeholder for the Ethereum tip jar on /donate. Replace the contents with
// the wallet connection and smart contract calls (ETH + USDC on Ethereum).
// The rest of the site only links to /donate, so nothing else needs to change.
export default function DonateWidget() {
  return (
    <div className="box space-y-3 bg-[#f4f4f0]">
      <UnderConstruction />
      <p className="text-center">
        the ethereum tip jar is still being built. check back soon!
      </p>
      <p className="text-center">
        <button
          type="button"
          className="btn-classic disabled:cursor-not-allowed disabled:opacity-60"
          disabled
        >
          Connect Wallet
        </button>
      </p>
    </div>
  );
}
