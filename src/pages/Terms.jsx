import StaticPage from "./StaticPage";

export default function Terms() {
  return (
    <StaticPage title="Terms of Service">
      <p className="rounded-xl border border-border bg-surface px-4 py-3 text-xs text-gold">
        Placeholder — GuestLens is in early development. This page will be replaced with full
        terms before public launch.
      </p>
      <p>
        By creating an event on GuestLens, you agree to use the service to collect and share
        wedding-related photos, videos and messages, and to have the rights to any content you
        upload or invite guests to upload.
      </p>
      <p>
        Pricing shown on this site is launch pricing and may change. Paid plans and refund terms
        will be finalized before payments go live.
      </p>
      <p>
        Questions in the meantime — email{" "}
        <a href="mailto:hello@guestlens.app" className="text-ink underline">
          hello@guestlens.app
        </a>
        .
      </p>
    </StaticPage>
  );
}
