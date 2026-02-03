# Canopy Connect Sandbox Credentials

Reference: https://docs.usecanopy.com/reference/sandbox-credentials

**Widget URL (Sandbox):** `https://app.usecanopy.com/c/policy-pilot`

---

## Test Credentials

| Username | Password | Description |
|----------|----------|-------------|
| `user_good` | `pass_good` | SFA with auto and home policies |
| `user_mfa` | `pass_good` | MFA (with options) - use `000000` for bad MFA, `000001` for login error, any other code = good |
| `user_optionless_mfa` | `pass_good` | MFA (without options) - same MFA code rules as above |
| `user_good_commercial` | `pass_good` | SFA with commercial policies |
| `user_good_flood` | `pass_good` | SFA with flood and home policies |
| `user_adams` | `pass_good` | Realistic flood/home policies with static data matching PDF dec pages |
| `user_locked` | `pass_good` | NOT_AUTHENTICATED with locked account error message |
| `user_unactivated` | `pass_good` | NOT_AUTHENTICATED with unactivated account error message |
| `user_good_expensive` | `pass_good` | SFA with 2.45x higher dwelling coverage premiums |
| `user_good_underinsured` | `pass_good` | SFA with higher home Coverage A limit |
| `user_good_home` | `pass_good` | SFA with home policy only |
| `user_good_auto` | `pass_good` | SFA with auto policy only |
| `user_good_partial_auto` | `pass_good` | SFA with auto/home, auto missing VehicleCoverages |
| `user_good_landlord` | `pass_good` | SFA with landlord policy |
| `user_good_no_policies` | `pass_good` | SFA with no policies, returns profile data only |
| `user_provider_error` | (any) | PROVIDER_ERROR status (ERROR webhook) |
| `user_internal_error` | (any) | INTERNAL_ERROR status (ERROR webhook) |
| `user_good_complete` | `pass_good` | Many policy/vehicle/dwelling/coverage/endorsement combos |
| `user_good_transportation` | `pass_good` | Commercial auto + commercial inland marine |
| `user_good_life` | `pass_good` | Term life + whole life policies |
| `user_good_term_life` | `pass_good` | Term life policy only |
| `user_good_whole_life` | `pass_good` | Whole life policy only |
| `user_good_universal_life` | `pass_good` | Universal life policy only |
| ALL OTHER | ALL OTHER | Bad credentials |

---

## Quick Start

**Recommended for initial testing:** `user_good` / `pass_good`
- Returns both auto and home policies
- No MFA required
- Good baseline to verify the full flow works

**For realistic PDF testing:** `user_adams` / `pass_good`
- Static data that matches the returned PDF dec pages
