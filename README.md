# Getting started with [Prisma](https://www.prisma.io/)

Based on the tutorial [here](https://www.prisma.io/docs/get-started).

## Usage

### Install dependencies
```bash
$ yarn
```

### Deploy `prisma.yml`
```bash
$ prisma deploy -e .env
```
Here `.env` should include `PRISMA_SECRET`.

### Generate Prisma client
```bash
$ prisma generate
```

### Generate type-safe classes for graphql.schema
```bash
$ graphqlgen
```

### Generate client and TypeScript types
```bash
$ yarn generate
```
