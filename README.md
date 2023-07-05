## Hello!

This is a sample Lemontree client project that connects to the Lemontree API, and lists food pantries nearby to an address, geocoded with a Google Places input.

## Getting started

### 1. You will need a `.env.local` file on the root, that should look like:

```
NEXT_PUBLIC_LEMONTREE_PLATFORM_ORIGIN="https://platform.lemontreefoods.org"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="[OBTAIN FROM GOOGLE]"
DATABASE_URL="file:./dev.db"
```

### 2. Set up the database

Run the following command to create a SQLite database file, with a sample `User` table:

```
npm run prisma migrate dev
```

### 3. Start the app!

```
npm run dev
```

Everything should be running on [http://localhost:3000](http://localhost:3000)!
