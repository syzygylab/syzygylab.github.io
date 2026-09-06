# Prototype handoff

## Scope

Six sample profiles, subject/grade/weekday-weekend/rate filters, tutor details, four weeks of dated availability, one-hour sessions, browser-local requests, pending review confirmation, online/in-person choices, placeholder contact actions, and explicit anonymous PostHog events.

## Data and scheduling

Schedules in lib/tutors.ts are editable weekly rules; change days/hours there for manual adjustments. Individual dated requests are removed from availability. Times use the device timezone for this POC; a production service must agree on a business timezone and model exceptions.

Only non-contact booking summaries persist in localStorage. Contact fields are validated in memory then discarded on success. No notification or request is delivered to Dana. Requests on another browser are independent. Web Locks serialize same-browser reservations where supported; server-side atomic reservations are needed in production.

## Photography

Homepage placeholder: Thirdman / Pexels, https://www.pexels.com/photo/a-teacher-tutoring-her-student-6503157/ . Tutor portraits: Pravatar placeholder photo service, https://pravatar.cc . Photos do not represent the fictional sample names. Remote imagery requires internet access.

## Quick manual demonstration

1. Open /tutors, choose Math and Grade 7, then clear filters.
2. View a sample tutor and choose an available date.
3. Select online or in person; fill in fictional parent/student details.
4. Submit. Verify pending-review wording and demo delivery disclaimer.
5. Return to that tutor and reload. The requested date/time is absent.
6. Open /contact; placeholder email/phone links open the corresponding handlers.
7. Open /demo to generate analytics traffic or reset browser-local requests.

Automated tests intentionally omitted at user request. Phase 6 (presentation, publishing, live-site verification) is separate.
