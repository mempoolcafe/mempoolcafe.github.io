// "This site accepts:" row, like the card logos on old storefronts.

function EthIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 26" width="8" height="13">
      <path d="M8 0 16 13 8 17.5 0 13Z" fill="#627eea" />
      <path d="M8 19 16 14.5 8 26 0 14.5Z" fill="#8fa4f0" />
    </svg>
  );
}

function UsdcIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12">
      <circle cx="8" cy="8" r="8" fill="#2775ca" />
      <text
        x="8"
        y="12"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="11"
        fontWeight="bold"
        fill="#fff"
      >
        $
      </text>
    </svg>
  );
}

function BtcIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12">
      <circle cx="8" cy="8" r="8" fill="#f7931a" />
      <text
        x="8"
        y="12"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="11"
        fontWeight="bold"
        fill="#fff"
        transform="rotate(14 8 8)"
      >
        B
      </text>
    </svg>
  );
}

export default function AcceptedTokens({
  className = "",
  showLabel = true,
}: {
  className?: string;
  /** The narrow sidebar hides "accepts:" so all badges fit on one row. */
  showLabel?: boolean;
}) {
  return (
    <p className={`flex flex-wrap items-center gap-1 text-[11px] ${className}`}>
      {showLabel && <span className="font-bold text-muted">accepts:</span>}
      <span className="accept-badge">
        <EthIcon /> ETH
      </span>
      <span className="accept-badge">
        <UsdcIcon /> USDC
      </span>
      <span className="accept-badge">
        <BtcIcon /> BTC
      </span>
    </p>
  );
}
