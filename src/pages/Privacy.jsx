import StaticPage from "./StaticPage";

export default function Privacy() {
  return (
    <StaticPage title="Privacy Policy">
      <p className="rounded-xl border border-border bg-surface px-4 py-3 text-xs text-gold">
        Placeholder — GuestLens is in early development. This page will be replaced with a full
        privacy policy before public launch.
      </p>
      <p>
        GuestLens plans to collect account information (name, email), event details you provide,
        and media guests upload to your event gallery. This data is used solely to operate your
        event gallery and is not sold to third parties.
      </p>
      <p>
        Each event is private by default and only accessible to people you share its link or QR
        code with. You'll be able to request deletion of your account and event data at any time.
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
