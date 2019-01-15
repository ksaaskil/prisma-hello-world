# Getting started with [Prisma](https://www.prisma.io/)

Partly based on the tutorial [Get started tutorial](https://www.prisma.io/docs/get-started) of Prisma.

## Instructions

Install dependencies:
```bash
$ yarn
$ yarn global add prisma graphqlgen
```

Deploy `prisma.yml`:
```bash
$ prisma deploy -e .env
```
Here `.env` should include `PRISMA_SECRET` and `PRISMA_ENDPOINT`.

Generate the Prisma client and TypeScript types:
```bash
$ yarn generate
```

This generates the Prisma client with
```bash
$ prisma generate
```
and type-safe TypeScript classes for resolvers etc. with
```bash
$ graphqlgen
```

Start the local GraphQL server at `http://localhost:4000`:
```bash
$ yarn start
```
