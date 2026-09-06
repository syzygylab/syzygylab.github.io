# Dana’s weekly PostHog summary

The prototype sends explicit anonymous events through the PostHog Capture API. No SDK autocapture, session recording, form scraping, contact details, or student names are collected. A strict property allowlist is enforced in lib/analytics.ts. IP geolocation enrichment is disabled. IDs are random and last for the browser tab session.

Configuration: ignored .env.local contains NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST. The host currently assumes US Cloud. Set the host to https://eu.i.posthog.com if this project is EU Cloud. Public project keys are necessarily visible in the built browser code. Configure these same build variables in GitHub Actions before deployment; do not commit .env.local.

## Events

| Event | Meaning / properties |
| --- | --- |
| $pageview | Page route, device_type |
| tutor_browse | Directory opened |
| tutor_filter | subject, grade, availability, max_rate |
| tutor_profile_view | tutor_id, tutor_name, subjects, grade_levels |
| booking_started | tutor_id, tutor_name, subject |
| time_slot_selected | tutor_id, selected_time |
| session_format_selected | tutor_id, session_format |
| booking_request_completed | tutor_id, tutor_name, subject, grade, session_format, selected_time |
| contact_action | contact_method: email or phone |

All events carry simulated and device_type. Actual UI events use simulated=false; demo traffic uses true. Device categorization for actual UI events uses viewport width below 768px as Mobile, otherwise Desktop; this is a viewport proxy, not hardware detection. Grade 0 means kindergarten.

## Create a dashboard named “ABC Tutoring — weekly overview”

Use the last 7 days, excluding simulated=true for real traffic. For the assessment, include only simulated=true and clearly label the dashboard as demo data.

1. Completed requests: Trends, booking_request_completed, total count.
2. Most-requested subjects: Trends, booking_request_completed, breakdown subject, bar chart.
3. Most-viewed tutors: Trends, tutor_profile_view, breakdown tutor_name, bar chart.
4. Profile-to-request conversion: Funnel, tutor_profile_view → booking_request_completed, 7-day window. Hold tutor_id constant so a view of one tutor is not credited for a request to another tutor. Break down by tutor_name if useful.
5. Mobile versus desktop: Trends, $pageview, unique users, breakdown device_type, pie chart.

The public project key allows event ingestion but does not authorize reading events or creating dashboards. These dashboard definitions are ready to configure in an authenticated PostHog session; they have not been created automatically.

## Demo

Open /demo and choose Generate sample traffic once. Six anonymous journeys yield five booking requests (one visitor stops early), spanning math, science, reading, online, and in-person. The browser shows endpoint acceptance, not proof of downstream processing. Check PostHog Activity and the dashboard after ingestion.

API reference: https://posthog.com/docs/api/capture
