import StaticPage from "./StaticPage";

export default function Privacy() {
  return (
    <StaticPage title="Privacy Policy" updated="22 August 2026">
      <p>
        GuestLens ("we", "us") runs guestlens.app, a platform for collecting wedding photos,
        videos, voice messages and text wishes into a private gallery. This policy explains what
        we collect, why, and how you're in control of it.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account information</strong> — your email address, used only to sign you in via
          a one-time link. We don't collect or store passwords.
        </li>
        <li>
          <strong>Event details</strong> — names, wedding date, reveal date, and photographer
          contact you enter when creating an event.
        </li>
        <li>
          <strong>Guest contributions</strong> — photos, videos, voice recordings and messages
          uploaded to an event, plus an optional name the guest provides. Guests are not required
          to create an account.
        </li>
        <li>
          <strong>Collaborator invitations</strong> — the email address of any photographer you
          invite to an event.
        </li>
      </ul>
      <p>We don't currently use analytics or advertising trackers on GuestLens.</p>

      <h2>How we use it</h2>
      <p>
        Solely to operate the event you created or contributed to: authenticating you, storing
        and displaying the gallery, and generating the QR code and share link. We do not sell
        your data or a guest's contributions to any third party, and we don't use uploaded photos
        or voice recordings for anything beyond the event they belong to.
      </p>

      <h2>Where it's stored</h2>
      <p>
        Account data, event details and uploaded media are stored with Supabase, our
        infrastructure provider, using access controls that restrict each event's data to its
        owner and anyone they've invited as a photographer collaborator.
      </p>

      <h2>Who can see an event</h2>
      <p>
        Every event lives at its own private link. It is not listed, searchable, or discoverable
        without that link or QR code. Before an event's reveal date (if one is set), its contents
        are visible only to the couple and any invited photographer — not to guests, even ones
        holding the link.
      </p>

      <h2>Retention</h2>
      <p>
        Events on the Free plan retain uploaded media for 30 days; Wedding Premium retains it for
        one year. You can request full deletion of an event and everything in it at any time by
        emailing us — see below.
      </p>

      <h2>Your rights</h2>
      <p>
        You can request a copy of your data, correction of inaccurate details, or full deletion
        of your account and events at any time. Guests who've contributed to an event can request
        removal of their specific upload by contacting the event owner directly, or us if that's
        not possible.
      </p>

      <h2>Children's data</h2>
      <p>
        GuestLens is intended for use by adults planning or attending a wedding. We don't
        knowingly collect account information from children. Photos or videos that happen to
        include children (as is common at weddings) are handled the same as any other guest
        upload, under the access controls described above.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If this policy changes materially, we'll update the date at the top of this page. Continued
        use of GuestLens after a change means you accept the updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions, requests, or concerns —{" "}
        <a href="mailto:hello@guestlens.app" className="text-ink underline">
          hello@guestlens.app
        </a>
        .
      </p>
    </StaticPage>
  );
}
