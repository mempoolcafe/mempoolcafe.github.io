import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import AcceptedTokens from "@/components/accepted-tokens";
import DonateWidget from "@/components/donate-widget";
import BitcoinDonate from "@/components/bitcoin-donate";

export const metadata: Metadata = {
  title: "Donate",
};

export default function DonatePage() {
  return (
    <>
      <PageHeader title="Donate" color="blue" />
      <p>
        if something here made you think, you can leave a tip in crypto: BTC
        on the Bitcoin network now, and ETH or USDC on Ethereum soon. thanks
        for stopping by!
      </p>
      <AcceptedTokens className="mt-3" />

      <section className="mt-6">
        <PageHeader title="Ethereum (ETH & USDC)" as="h2" />
        <DonateWidget />
      </section>

      <section className="mt-6">
        <PageHeader title="Bitcoin (BTC)" as="h2" />
        <BitcoinDonate />
      </section>
    </>
  );
}
