import { portfolioData } from "@/lib/portfolio-data";
import CopyButton from "@/components/copy-button";

// Bitcoin tips go straight to a native SegWit address (set in
// portfolio-data.ts). Bitcoin can't go through the Ethereum contract, so it
// gets its own section on /donate.
export default function BitcoinDonate() {
  const address = portfolioData.donate.bitcoinAddress;

  return (
    <div className="box space-y-3 bg-[#f4f4f0]">
      <p>
        send BTC on the <span className="font-bold">Bitcoin network</span> to
        this native SegWit address:
      </p>
      <p className="input-classic select-all break-all font-mono text-[13px]">
        {address}
      </p>
      <p className="flex flex-wrap gap-2">
        <CopyButton text={address} label="Copy BTC Address" />
        <a href={`bitcoin:${address}`} className="btn-classic inline-block no-underline">
          Open in Wallet
        </a>
      </p>
      <p className="text-[11px] text-muted">
        bitcoin (BTC) only. coins sent here on any other network will be lost.
      </p>
    </div>
  );
}
