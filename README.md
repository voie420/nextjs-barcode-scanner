This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Warnings

⚠️ This project is a proof of concept and is not intended for immediate production use. It serves as a starting point, offering guidance on how you can develop something similar.

⚠️ iOS devices restrict activities that don't use HTTPS, which means it won't function properly during development testing.

⚠️ This project is free for everyone to use without the need for credit. However, please refrain from distributing it.

## Barcodes

Depending on the barcodes you are trying to scan you can adjust the reader property of Quagga.

```ts
Quagga.decodeSingle(
  {
    src: image as string,
    decoder: {
      readers: ['code_128_reader'], // Adjust this to what barcodes this service is supposed to read.
    },
    debug: false,
  },
  callback,
);
```

Supported barcode readers.

```json
{
  code_128_reader
  ean_reader
  ean_5_reader
  ean_2_reader
  ean_8_reader
  code_39_reader
  code_39_vin_reader
  codabar_reader
  upc_reader
  upc_e_reader
  i2of5_reader
  2of5_reader
  code_93_reader
  code_32_reader
}
```
