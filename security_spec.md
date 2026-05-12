# Security Specification - ShoeWash Premium

## Data Invariants
- An order must always have a customerId matching the creator's UID.
- Order status can only be modified by Admins.
- Initial order status must be 'pending'.
- Users cannot change their own 'role' field to 'admin'.
- PII (addresses, whatsapp) must be protected.

## The Dirty Dozen Payloads (Targeting Rejection)

1. **Identity Theft**: User A tries to create an order as User B.
   `{ "customerId": "user_B", "customerName": "Victim", ... }` -> REJECT (UID mismatch)

2. **Privilege Escalation**: User A tries to create their profile as 'admin'.
   `{ "name": "Hacker", "role": "admin", ... }` -> REJECT (role must be 'customer' on self-create)

3. **Status Shortcut**: User A tries to create an order already in 'completed' status.
   `{ "status": "completed", ... }` -> REJECT (must be 'pending')

4. **Shadow Update**: User A tries to update an order's status to 'shipped'.
   `{ "status": "shipped" }` -> REJECT (admin only for status)

5. **Resource Poisoning**: Injection of a massive string in 'address'.
   `{ "address": "A".repeat(2000), ... }` -> REJECT (size check)

6. **ID Injection**: Using a malformed ID for an order.
   `orderId: "invalid_#_ID"` -> REJECT (regex check)

7. **Email Spoofing**: User A attempts to read User B's order.
   `get(/orders/order_B)` as User A -> REJECT (ownerId mismatch)

8. **Admin Hijack**: User A tries to delete the 'services' collection.
   `delete(/services/deep-cleaning)` as User A -> REJECT (admin only)

9. **Price Manipulation**: User A tries to set `totalPrice` to 0.
   `{ "totalPrice": 0, ... }` -> REJECT (must match service price / bounds)

10. **Immutable Field Change**: User A tries to change `createdAt` on an update.
    `{ "createdAt": "2020-01-01" }` -> REJECT (immutable)

11. **PII Leak**: Unauthenticated user tries to list all `users`.
    `list(/users)` as anonymous -> REJECT (auth required)

12. **Ghost Field Update**: User A tries to add `isVIP: true` to their user profile.
    `{ "isVIP": true }` -> REJECT (strict keys)
